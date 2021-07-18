const UIDGenerator = require("uid-generator")

async function generateEmailUnsubscribeToken() {
    const uidgen = new UIDGenerator(384, UIDGenerator.BASE66)
    return await uidgen.generate().catch(() => null)
}
exports.generateEmailUnsubscribeToken = generateEmailUnsubscribeToken

async function generateInviteToken() {
    const uidgen = new UIDGenerator(256, UIDGenerator.BASE58)
    return await uidgen.generate().catch(() => null)
}
exports.generateInviteToken = generateInviteToken

exports.default = {
    generateEmailUnsubscribeToken,
    generateInviteToken,
}
