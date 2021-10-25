import * as sapper from "@sapper/app"
import "intl-pluralrules"
import * as smoothscroll from "smoothscroll-polyfill"

const target = document.getElementById("sapper")
if (target !== null) {
    void sapper.start({
        target,
    })
}
smoothscroll.polyfill()
