import * as sapper from "@sapper/app"

import "intl-pluralrules"

const target = document.getElementById("sapper")
if (target !== null) {
    sapper.start({
        target,
    })
}
