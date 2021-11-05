import { exportJWK, generateKeyPair } from "jose"
import { v4 as uuidv4 } from "uuid"
;(async () => {
    const ALGORITHM = "EdDSA"
    const { privateKey, publicKey } = await generateKeyPair(ALGORITHM)
    const kid = uuidv4()
    const privateKeyJWK = await exportJWK(privateKey)
    privateKeyJWK.kid = kid
    const publicKeyJWK = await exportJWK(publicKey)
    publicKeyJWK.kid = kid
    console.log({
        privateKeyJWK,
        publicKeyJWK,
    })
    const jwks = {
        keys: [publicKeyJWK, "old_key_2", "old_key_1"],
    }
    console.log(`REFRESH_TOKEN_SECRET_KEY=${JSON.stringify(privateKeyJWK)}`)
    console.log(`REFRESH_TOKEN_JWKS=${JSON.stringify(jwks)}`)
})()
