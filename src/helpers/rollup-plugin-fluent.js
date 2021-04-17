/**
 * File adapted from
 * https://github.com/TrySound/rollup-plugin-string/blob/master/index.js
 */

import { extname } from "path"
import { createFilter } from "@rollup/pluginutils"

const exts = [".ftl"]

function fluent(opts = {}) {
    const filter = createFilter(opts.include, opts.exclude)

    return {
        name: "fluent",

        transform(content, id) {
            if (!filter(id)) return null
            if (!exts.includes(extname(id))) return null
            return {
                code: `
                import { FluentResource } from "@fluent/bundle"
                export default new FluentResource(${JSON.stringify(content)});`,
                map: { mappings: "" },
            }
        },
    }
}

export default fluent
