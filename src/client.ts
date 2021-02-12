import * as sapper from "@sapper/app"

const target = document.getElementById("sapper")
if (target !== null) {
    sapper.start({
        target,
    })
}
