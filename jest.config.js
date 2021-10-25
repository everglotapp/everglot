const path = require("path")

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    // transform: {
    //     "^.+\\.mjs?$": "babel-jest",
    // "^.+\\.ts$": "ts-jest",
    //     "^.+\\.svelte$": [
    //         "jest-transform-svelte",
    //         {
    //             typescript: {},
    //             stylus: {
    //                 includePaths: ["src"],
    //             },
    //             postcss: {
    //                 plugins: [require("autoprefixer")],
    //             },
    //         },
    //     ],
    // },
    // transform: {},
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            // isolatedModules: true,
            diagnostics: {
                warnOnly: true,
            },
        },
    },
    // extensionsToTreatAsEsm: [".ts"],
    // modulePaths: ["<rootDir>/src/node_modules/"],
    // moduleDirectories: ["node_modules", "src/node_modules"],
    testPathIgnorePatterns: [
        "/node_modules/",
        "<rootDir>/src/__tests__/utils/",
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "mjs", "json"],
    transformIgnorePatterns: ["<rootDir>/node_modules/(?!@sapper)"],
    // moduleNameMapper: {
    //     "^src/(.*)": "<rootDir>/src/$1",
    // },
    //preset: "@babel/preset-typescript",
    collectCoverage: true,
    collectCoverageFrom: ["*.js", "*/*.js", "*[^\\.d].ts", "*/*[^\\.d].ts"],
    coveragePathIgnorePatterns: [
        "src/__tests__/*",
        "(.)*\\.config\\.js",
        "\\.eslintrc\\.js",
    ],
    // coverageThreshold: {
    //     global: {
    //         branches: 98,
    //         functions: 100,
    //         lines: 100,
    //         statements: 99,
    //     },
    // },
}
