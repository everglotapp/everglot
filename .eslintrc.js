module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
    plugins: ["@typescript-eslint", "prettier"],
    rules: {
        "@typescript-eslint/no-floating-promises": 1,
        "prettier/prettier": "error",
    },
}
