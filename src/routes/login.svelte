<script lang="ts">
    import { onMount } from "svelte"
    import { goto } from "@sapper/app"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import PageTitle from "../comp/typography/PageTitle.svelte"
    import ErrorMessage from "../comp/util/ErrorMessage.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import { AuthMethod, MIN_PASSWORD_LENGTH } from "../users"
    import { GOOGLE_SIGNIN_CLIENT_ID } from "../constants"

    let errorMessage: string | null = null
    let submitting = false
    let blockGoogleSignIn = false

    const handleSubmit = async (_event: Event) => {
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
        errorMessage = null
        const response = await doSubmit({
            method: AuthMethod.EMAIL,
            email,
            password,
        })
        const res = await response?.json()
        if (!res || !res.hasOwnProperty("success")) {
            return
        }
        if (res.success === true) {
            goto("/")
        } else {
            errorMessage = res.message
        }
    }

    type SubmitBody = {
        method: AuthMethod
        idToken?: string
        email?: string
        password?: string
    }

    async function doSubmit(body: SubmitBody): Promise<Response | null> {
        const response = await fetch("/login", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
            redirect: "follow",
        })

        submitting = false

        if (response.redirected && response?.url?.length) {
            errorMessage = "Your account is not registered, yet."
            window.location.href = response.url!
            return null
        }

        return response
    }

    onMount(() => {
        const signedOut = new URL(window.location.href).searchParams.get(
            "signedout"
        )
        if (signedOut === "1") {
            // @ts-ignore
            window.gapi?.auth2?.getAuthInstance()?.signOut()
            blockGoogleSignIn = true
        }
        // @ts-ignore
        window.onSignIn = async (googleUser: any) => {
            if (blockGoogleSignIn) {
                return
            }
            const response = await doSubmit({
                method: AuthMethod.GOOGLE,
                idToken: googleUser?.getAuthResponse()?.id_token,
            })
            const res = await response?.json()
            if (!res || !res.hasOwnProperty("success")) {
                return
            }
            if (res.success === true) {
                goto("/signup")
            } else {
                errorMessage = res.message
            }
        }
    })

    let email = ""
    let password = ""
</script>

<svelte:head>
    <title>Login – Everglot</title>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta name="google-signin-client_id" content={GOOGLE_SIGNIN_CLIENT_ID} />
</svelte:head>

<div class="container px-4 mx-auto mt-16 mb-32 max-w-sm">
    <PageTitle><Localized id="login-title" /></PageTitle>

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
            <label for="email"><Localized id="login-form-email" /></label>
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
            <label for="password"><Localized id="login-form-password" /></label>
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
        <ButtonLarge
            tag="button"
            type="submit"
            className="w-full justify-center"
            disabled={submitting}
            on:click={handleSubmit}
            ><Localized id="login-form-submit" /></ButtonLarge
        >
        <div
            class="g-signin2 flex justify-center mt-2 mb-1"
            data-onsuccess="onSignIn"
            data-longtitle="true"
            on:click={() => (blockGoogleSignIn = false)}
        />
        <ButtonLarge
            href="join"
            variant="OUTLINED"
            className="w-full justify-center"
            ><Localized id="login-form-signup" /></ButtonLarge
        >
    </form>
</div>

<style>
    :global(.g-signin2) {
        min-height: 36px;
    }
</style>
