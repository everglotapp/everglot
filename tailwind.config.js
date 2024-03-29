const mode = process.env.NODE_ENV
const dev = mode === "development"

module.exports = {
    future: {
        // for tailwind 2.0 compat
        purgeLayersByDefault: true,
        removeDeprecatedGapUtilities: true,
    },
    experimental: {
        uniformColorPalette: true,
        extendedFontSizeScale: true,
        applyComplexClasses: true,
    },
    content: ["./src/**/*.svelte", "./src/**/*.html"],
    theme: {
        container: {
            center: true,
        },
        fontFamily: {
            sans: [
                '"Noto Sans"',
                '"Noto Sans SC"',
                "Helvetica",
                "Arial",
                "sans-serif",
            ],
            secondary: ["Poppins", "Verdana", "Geneva", "Tahoma", "sans-serif"],
        },
        extend: {
            colors: {
                primary: {
                    lightest: "rgb(224, 247, 247)",
                    light: "#68e5e5",
                    bitlight: "#62d4d4",
                    DEFAULT: "#45cdcd",
                    dark: "#009eeb",
                },
                secondary: {
                    DEFAULT: "#7f5b53",
                    dark: "#7d6863",
                },
                accent: {
                    DEFAULT: "rgb(24, 237, 227)",
                },
                gray: {
                    darkest: "#1f2d3d",
                    dark: "#3c4858",
                    bitdark: "rgb(85, 107, 112)",
                    DEFAULT: "rgb(171, 174, 178)",
                    bitlight: "#c0ccda",
                    light: "#e0e6ed",
                    verylight: "rgb(235, 240, 245)",
                    lightest: "#f9fafc",
                    // lightest: "rgb(239, 248, 246)",
                },
                danger: {
                    DEFAULT: "#d23b41",
                    lightest: "#ffcdcf",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
}
