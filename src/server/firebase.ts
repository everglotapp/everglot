import firebaseAdmin, { credential } from "firebase-admin"
import firebaseServiceAccount from "../firebaseServiceAccount.json"

import type { ServiceAccount } from "firebase-admin"

let app: firebaseAdmin.app.App | undefined

export const getApp = () => (app ||= makeApp())

const makeApp = () =>
    firebaseAdmin.initializeApp({
        credential: credential.cert(firebaseServiceAccount as ServiceAccount),
    })
