const sveltePreprocess = require("svelte-preprocess")

const { optimizeCarbonImports } = require("carbon-components-svelte/preprocess")

module.exports = {
    preprocess: [sveltePreprocess({ postcss: true }), optimizeCarbonImports()],
}
