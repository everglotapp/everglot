module.exports = {
    plugins: [
        require("tailwindcss"),
        require("postcss-preset-env")({
            features: {
                // enable nesting
                "nesting-rules": true,
                'focus-within-pseudo-class': false
            },
        }),
        require("autoprefixer"),
        require("cssnano"),
    ],
}
