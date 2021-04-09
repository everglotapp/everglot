const path = require("path")

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    rootDir: "src",
    globals: {
        "ts-jest": { isolatedModules: true },
    },
    testPathIgnorePatterns: ["/node_modules/", "<rootDir>/__tests__/utils/"],
    //preset: "@babel/preset-typescript",
}
