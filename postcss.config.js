module.exports = {
    plugins: [
        require("postcss-import"),
        require("tailwindcss/nesting")(require("postcss-nesting")),
        require("tailwindcss"),
        require("postcss-preset-env")({
            features: {
                "nesting-rules": false, // handled by tailwindcss/nesting
                "focus-within-pseudo-class": false,
            },
        }),
        require("autoprefixer"),
        require("cssnano"),
    ],
}
