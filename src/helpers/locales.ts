import path from "path"
import { readFileSync } from "fs"
import { FluentBundle, FluentResource } from "@fluent/bundle"

export const importFluentResource = (name: string, locale: string) =>
    new FluentResource(
        readFileSync(
            path.resolve(__dirname, `../../../locales/${locale}/${name}.ftl`),
            "utf-8"
        )
    )
