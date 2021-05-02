import { DATABASE_ROLE_CLIENT, DATABASE_ROLE_SERVER } from "../../server/db"

describe("security checks", () => {
    test("database roles are restricted", () => {
        /**
         * This prevents us from accidentally pushing wrong
         * database access roles to produtcion.
         */
        expect(DATABASE_ROLE_CLIENT).toBe("evg_client")
        expect(DATABASE_ROLE_SERVER).toBe("evg_server")
    })
})
