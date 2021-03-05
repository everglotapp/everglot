<script lang="ts">
    import { goto } from "@sapper/app"
    import { onMount } from "svelte"

    import PageTitle from "../comp/typography/PageTitle.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import { signedIn } from "../stores"

    onMount(() => {
        if ($signedIn) {
            goto("/index", { replaceState: true, noscroll: true })
        }
    })

    let errorMessage: string | null = null
    let submitting = false
    const handleSubmit = (_event: Event) => {
        if (submitting) {
            return
        }
        const form = document.forms[0]
        if (form.name !== "join") {
            return
        }
        // TODO: replace with JS form validation
        if (!form.reportValidity()) {
            // TODO: give feedback that submission failed and why
            return
        }
        submitting = true
        fetch("/join/", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((response) => {
                if (response.status !== 200) {
                    return
                }
                response.json().then((res) => {
                    if (!res.hasOwnProperty("success")) {
                        return
                    }
                    if (res.success === true) {
                        $signedIn = true
                        goto("/profile", { replaceState: true, noscroll: true })
                    } else {
                        errorMessage = res.message
                    }
                })
            })
            .then(() => {
                submitting = false
            })
    }
    let email = ""
    let password = ""
</script>

<svelte:head>
    <title>Join – Everglot</title>
</svelte:head>

<div class="container px-4 mx-auto my-16 max-w-sm">
    <PageTitle>Join Everglot</PageTitle>

    {#if errorMessage}
        <div class="p-8 bg-red-200 text-gray-dark font-bold">
            {errorMessage}
        </div>
    {/if}

    <form
        on:submit|preventDefault={handleSubmit}
        name="join"
        method="post"
        class="bg-white my-8"
    >
        <div class="flex flex-col w-full mb-2">
            <label for="email">Email</label>
            <input
                id="email"
                type="email"
                bind:value={email}
                placeholder="jane.doe@example.com"
                required
            />
        </div>
        <div class="flex flex-col w-full mb-2">
            <label for="password">Password</label>
            <input
                id="password"
                type="password"
                minlength="8"
                pattern={`.{8,}`}
                title="8 characters minimum"
                bind:value={password}
                required
            />
        </div>
        <p class="my-5 text-gray-bitdark text-sm">
            By signing up you agree to our <a
                href="/privacy"
                class="font-normal">privacy policy</a
            >.
        </p>
        <button
            type="submit"
            disabled={submitting}
            on:click={handleSubmit}
            class="py-3 px-10 w-full mb-1 bg-primary hover:bg-primary-bitlight text-white rounded-xl font-bold"
            >Create a new account</button
        >
        <ButtonLarge
            href="login"
            variant="TEXT"
            className="w-full justify-center"
            >I already have an account</ButtonLarge
        >
    </form>
</div>
