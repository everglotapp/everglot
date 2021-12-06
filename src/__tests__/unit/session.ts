import { getSessionIdCookieValue } from "../utils"

const { SESSION_COOKIE_NAME } = process.env

describe("getSessionCookieValue", () => {
    it("works as expected", () => {
        const headers = {
            "set-cookie": [
                `${SESSION_COOKIE_NAME}=s%3Am9MaPp1xZJNUxQPp1xZJNUxQ4GvrYLPVz32JoIm61_YNLwr_Pp1xZJNUxQ4GvrYLMaPp1xZJNUxQ4GvrYLDW%2BNieJNUxQ4Gvo; Path=/; Expires=Mon, 06 Dec 2021 10:08:19 GMT; HttpOnly; SameSite=Strict`,
            ],
        }
        expect(getSessionIdCookieValue(headers)).toBe(
            "s%3Am9MaPp1xZJNUxQPp1xZJNUxQ4GvrYLPVz32JoIm61_YNLwr_Pp1xZJNUxQ4GvrYLMaPp1xZJNUxQ4GvrYLDW%2BNieJNUxQ4Gvo"
        )
    })
})
