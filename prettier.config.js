module.exports = {
    trailingComma: "es5",
    tabWidth: 4,
    semi: false,
    singleQuote: false,
    overrides: [
        {
            files: "*.json",
            options: {
                tabWidth: 2,
            },
        },
        {
            files: "*.ts",
            options: {
                tabWidth: 4,
            },
        },
        {
            files: "*.js",
            options: {
                tabWidth: 4,
            },
        },
        {
            files: "*.css",
            options: {
                tabWidth: 2,
            },
        },
    ],
}
