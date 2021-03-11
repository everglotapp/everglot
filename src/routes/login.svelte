<script lang="ts">
    import { goto } from "@sapper/app"
    import { onMount } from "svelte"

    import PageTitle from "../comp/typography/PageTitle.svelte"
    import ErrorMessage from "../comp/util/ErrorMessage.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import { signedIn } from "../stores"
    import { MIN_PASSWORD_LENGTH } from "../users"

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
        if (form.name !== "login") {
            return
        }
        // TODO: replace with JS form validation
        if (!form.reportValidity()) {
            // TODO: give feedback that submission failed and why
            return
        }
        submitting = true
        fetch("/login/", {
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
    <title>Login – Everglot</title>
</svelte:head>

<div class="container px-4 mx-auto mt-16 mb-32 max-w-sm">
    <PageTitle>Login to Everglot</PageTitle>

    {#if errorMessage}
        <ErrorMessage>{errorMessage}</ErrorMessage>
    {/if}

    <form
        on:submit|preventDefault={handleSubmit}
        method="post"
        name="login"
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
                class="py-2"
            />
        </div>
        <div class="flex flex-col w-full mb-2">
            <label for="password">Password</label>
            <input
                id="password"
                type="password"
                minlength={MIN_PASSWORD_LENGTH}
                pattern={`.{${MIN_PASSWORD_LENGTH},}`}
                title={`${MIN_PASSWORD_LENGTH} characters minimum`}
                bind:value={password}
                required
                class="py-2"
            />
        </div>
        <button
            type="submit"
            class="mt-5 py-3 px-10 w-full mb-1 bg-primary hover:bg-primary-bitlight text-white rounded-xl font-bold"
            >Login</button
        >
        <ButtonLarge
            href="join"
            variant="OUTLINED"
            className="w-full justify-center"
            >I don't have an account</ButtonLarge
        >
        <div class="py-4 font-bold my-8 px-8 bg-primary-lightest">
            Sorry, login will be available soon!
        </div>
    </form>
</div>
