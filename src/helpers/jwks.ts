import { importJWK } from "jose"
import type { JWK, JWSHeaderParameters, KeyLike } from "jose/dist/types/types"

function getKtyFromAlg(alg: unknown) {
    switch (typeof alg === "string" && alg.substr(0, 2)) {
        case "RS":
        case "PS":
            return "RSA"
        case "ES":
            return "EC"
        case "Ed":
            return "OKP"
        default:
            throw new Error('Unsupported "alg" value for a JSON Web Key Set')
    }
}

interface Cache {
    [alg: string]: KeyLike
}

export class JWKSet {
    private _jwks?: { keys: JWK[] }

    private _cached: WeakMap<JWK, Cache> = new WeakMap()

    async getKey(protectedHeader: JWSHeaderParameters): Promise<KeyLike> {
        if (!this._jwks) {
            throw new Error("First load the jwks using JWKSet.load(jsonStr)")
        }

        const candidates = this._jwks!.keys.filter((jwk) => {
            // filter keys based on the mapping of signature algorithms to Key Type
            let candidate = jwk.kty === getKtyFromAlg(protectedHeader.alg)

            // filter keys based on the JWK Key ID in the header
            if (candidate && typeof protectedHeader.kid === "string") {
                candidate = protectedHeader.kid === jwk.kid
            }

            // filter keys based on the key's declared Algorithm
            if (candidate && typeof jwk.alg === "string") {
                candidate = protectedHeader.alg === jwk.alg
            }

            // filter keys based on the key's declared Public Key Use
            if (candidate && typeof jwk.use === "string") {
                candidate = jwk.use === "sig"
            }

            // filter keys based on the key's declared Key Operations
            if (candidate && Array.isArray(jwk.key_ops)) {
                candidate = jwk.key_ops.includes("verify")
            }

            // filter out non-applicable OKP Sub Types
            if (candidate && protectedHeader.alg === "EdDSA") {
                candidate = jwk.crv === "Ed25519" || jwk.crv === "Ed448"
            }

            // filter out non-applicable EC curves
            if (candidate) {
                switch (protectedHeader.alg) {
                    case "ES256":
                        candidate = jwk.crv === "P-256"
                        break
                    case "ES256K":
                        candidate = jwk.crv === "secp256k1"
                        break
                    case "ES384":
                        candidate = jwk.crv === "P-384"
                        break
                    case "ES512":
                        candidate = jwk.crv === "P-521"
                        break
                    default:
                }
            }

            return candidate
        })

        const { 0: jwk, length } = candidates

        if (length === 0) {
            throw new Error("No matching key")
        } else if (length !== 1) {
            throw new Error("Multiple matching keys")
        }

        const cached =
            this._cached.get(jwk) || this._cached.set(jwk, {}).get(jwk)!
        if (cached[protectedHeader.alg!] === undefined) {
            const keyObject = await importJWK(
                { ...jwk, ext: true },
                protectedHeader.alg!
            )

            if (
                keyObject instanceof Uint8Array ||
                keyObject.type !== "public"
            ) {
                throw new Error("JSON Web Key Set members must be public keys")
            }

            cached[protectedHeader.alg!] = keyObject
        }

        return cached[protectedHeader.alg!]
    }

    load(jsonStr: string) {
        try {
            const json = JSON.parse(jsonStr)

            if (
                typeof json !== "object" ||
                !json ||
                !Array.isArray(json.keys) ||
                !json.keys.every(isJWKLike)
            ) {
                throw new Error("JSON Web Key Set malformed")
            }

            this._jwks = { keys: json.keys }
        } catch {
            throw new Error("Failed to parse the JSON Web Key Set as JSON")
        }
    }
}

export function isJWKLike(key: unknown) {
    return isObject<JWK>(key)
}

/**
 * Source: https://github.com/panva/jose/blob/main/src/lib/is_object.ts
 */
export function isObject<T = object>(input: unknown): input is T {
    if (
        !isObjectLike(input) ||
        Object.prototype.toString.call(input) !== "[object Object]"
    ) {
        return false
    }
    if (Object.getPrototypeOf(input) === null) {
        return true
    }
    let proto = input
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto)
    }
    return Object.getPrototypeOf(input) === proto
}

function isObjectLike(value: unknown) {
    return typeof value === "object" && value !== null
}

export default JWKSet
