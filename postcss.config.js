module.exports = {
    plugins: [
        require("tailwindcss"),
        require("postcss-preset-env")({
            features: {
                // enable nesting
                "nesting-rules": true,
            },
        }),
        require("autoprefixer"),
        require("cssnano"),
    ],
}
