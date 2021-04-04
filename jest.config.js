const path = require("path")

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testRegex: "src/tests/(.*)\\.(ts)",
    globals: {
        "ts-jest": { isolatedModules: true },
    },
    //preset: "@babel/preset-typescript",
}
