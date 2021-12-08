import path from "path"
import fs from "fs"
import resolve from "@rollup/plugin-node-resolve"
import replace from "@rollup/plugin-replace"
import commonjs from "@rollup/plugin-commonjs"
import url from "@rollup/plugin-url"
import svelte from "rollup-plugin-svelte"
import babel from "@rollup/plugin-babel"
import json from "@rollup/plugin-json"
import { terser } from "rollup-plugin-terser"
import typescript from "@rollup/plugin-typescript"
import graphql from "@rollup/plugin-graphql"
import config from "sapper/config/rollup.js"
import fluent from "./src/helpers/rollup-plugin-fluent"
import pkg from "./package.json"

const mode = process.env.NODE_ENV
const dev = mode === "development"
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const { preprocess } = require("./svelte.config")

const onwarn = (warning, onwarn) =>
    (warning.code === "MISSING_EXPORT" && /'preload'/.test(warning.message)) ||
    (warning.code === "CIRCULAR_DEPENDENCY" &&
        /[/\\]@sapper[/\\]/.test(warning.message)) ||
    warning.code === "THIS_IS_UNDEFINED" ||
    (warning.code === "PLUGIN_WARNING" &&
        warning.pluginCode &&
        warning.pluginCode === "a11y-no-onchange") ||
    onwarn(warning)

export default {
    client: {
        input: config.client.input().replace(/\.js$/, ".ts"),
        output: config.client.output(),
        sourcemap: dev,
        plugins: [
            replace({
                "process.browser": true,
                "process.env.NODE_ENV": JSON.stringify(mode),
                preventAssignment: true,
            }),
            svelte({
                emitCss: true,
                preprocess,
                compilerOptions: {
                    dev,
                    hydratable: true,
                },
            }),
            url({
                sourceDir: path.resolve(__dirname, "src/node_modules/images"),
                publicPath: "/client/",
            }),
            resolve({
                browser: true,
                dedupe: ["svelte"],
            }),
            json({ compact: true }),
            commonjs(),
            typescript({ sourceMap: dev, noEmit: !dev }),
            graphql(),
            fluent({
                include: "locales/**/*.ftl",
            }),
            ...(dev
                ? [
                      {
                          buildStart() {
                              const localesDir = path.resolve(
                                  __dirname,
                                  "./locales/"
                              )
                              const locales = fs.readdirSync(localesDir)
                              locales.forEach((locale) => {
                                  this.addWatchFile(
                                      path.join(localesDir, locale, `app.ftl`)
                                  )
                              })
                          },
                      },
                  ]
                : []),

            legacy &&
                babel({
                    extensions: [".js", ".mjs", ".html", ".svelte"],
                    babelHelpers: "runtime",
                    exclude: ["node_modules/@babel/**"],
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: "> 0.25%, not dead",
                            },
                        ],
                    ],
                    plugins: [
                        "@babel/plugin-syntax-dynamic-import",
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                useESModules: true,
                            },
                        ],
                    ],
                }),

            !dev &&
                terser({
                    module: true,
                }),
        ],

        preserveEntrySignatures: false,
        onwarn,
    },

    server: {
        input: { server: config.server.input().server.replace(/\.js$/, ".ts") },
        output: config.server.output(),
        plugins: [
            replace({
                "process.browser": false,
                "process.env.NODE_ENV": JSON.stringify(mode),
                preventAssignment: true,
            }),
            svelte({
                preprocess,
                compilerOptions: {
                    generate: "ssr",
                    hydratable: true,
                    dev,
                },
            }),
            url({
                sourceDir: path.resolve(__dirname, "src/node_modules/images"),
                publicPath: "/client/",
                emitFiles: false, // already emitted by client build
            }),
            resolve({
                exportConditions: ["node"],
                dedupe: ["svelte"],
            }),
            json({ compact: true }),
            commonjs(),
            typescript({ sourceMap: dev, noEmit: !dev }),
            graphql(),
            fluent({
                include: "locales/**/*.ftl",
            }),
            ...(dev
                ? [
                      {
                          buildStart() {
                              const localesDir = path.resolve(
                                  __dirname,
                                  "./locales/"
                              )
                              const locales = fs.readdirSync(localesDir)
                              locales.forEach((locale) => {
                                  this.addWatchFile(
                                      path.join(localesDir, locale, `bot.ftl`)
                                  )
                              })
                          },
                      },
                  ]
                : []),
        ],
        external: Object.keys(pkg.dependencies).concat(
            require("module").builtinModules
        ),

        preserveEntrySignatures: "strict",
        onwarn,
    },

    serviceworker: {
        input: config.serviceworker.input().replace(/\.js$/, ".ts"),
        output: config.serviceworker.output(),
        plugins: [
            resolve(),
            replace({
                "process.browser": true,
                "process.env.NODE_ENV": JSON.stringify(mode),
                preventAssignment: true,
            }),
            commonjs(),
            typescript({ sourceMap: dev }),
            graphql(),
            fluent({
                include: "locales/**/*.ftl",
            }),
            !dev && terser(),
        ],

        preserveEntrySignatures: false,
        onwarn,
    },
}
