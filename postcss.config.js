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
        // require("cssnano"), // TODO: activate as soon as PostCSS is supported by cssnano (https://github.com/cssnano/cssnano/issues/952)
    ],
}
