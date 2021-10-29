<script lang="ts">
    import { onMount } from "svelte"
    import { goto } from "@sapper/app"

    export let to = ""
    export let gotoArgs:
        | { replaceState: boolean; noscroll: boolean }
        | undefined = { replaceState: true, noscroll: false }

    let done = false

    async function redirect() {
        if (done) {
            return
        }
        await goto(to, gotoArgs)
        done = true
    }

    onMount(async () => {
        await redirect()
    })
</script>
