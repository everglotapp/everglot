<script lang="ts">
    import { onMount } from "svelte"
    import { goto } from "@sapper/app"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../components/layout/BrowserTitle.svelte"
    import PageTitle from "../components/typography/PageTitle.svelte"
    import ErrorMessage from "../components/util/ErrorMessage.svelte"
    import ButtonLarge from "../components/util/ButtonLarge.svelte"

    import GoogleAuthButton from "../components/util/GoogleAuthButton.svelte"

    import { AuthMethod, MIN_PASSWORD_LENGTH } from "../users"
    import { inviteToken, prefillPasswordAfterReset } from "../stores"

    let errorMessage: string | null = null
    let submitting = false
    let blockGoogleSignIn = false

    const FORM_NAME = "login" as const
    const handleSubmit = async (_event: Event) => {
        if (submitting) {
            return
        }
        const form = document.forms[0]
        if (form.name !== FORM_NAME) {
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
        if ($prefillPasswordAfterReset) {
            password = $prefillPasswordAfterReset
            $prefillPasswordAfterReset = null
        }
        const signedOut = new URL(window.location.href).searchParams.get(
            "signedout"
        )
        if (signedOut === "1") {
            blockGoogleSignIn = true
        }
        if ($inviteToken === null) {
            $inviteToken = new URL(window.location.href).searchParams.get(
                "token"
            )
        }
    })

    let email = ""
    let password = ""

    async function handleGoogleSignIn(
        event: CustomEvent<{ googleUser: gapi.auth2.GoogleUser }>
    ) {
        if (blockGoogleSignIn) {
            return
        }
        const { googleUser } = event.detail
        const response = await doSubmit({
            method: AuthMethod.GOOGLE,
            idToken: googleUser.getAuthResponse().id_token,
        })
        const res = await response?.json()
        if (!res || !res.hasOwnProperty("success")) {
            return
        }
        if (res.success === true) {
            window.location.href = "/"
        } else {
            errorMessage = res.message
        }
    }

    $: joinUrl = $inviteToken ? `/join?token=${$inviteToken}` : "/join"
    $: resetPasswordUrl = "/users/password/reset"
</script>

<Localized id="login-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<div class="container px-4 mx-auto mt-16 mb-32 md:mt-32 max-w-sm">
    <img src="/logo-192.png" alt="Everglot" class="mx-auto mb-8" />

    <PageTitle>
        <Localized id="login-title" />
    </PageTitle>

    {#if errorMessage}
        <ErrorMessage>{errorMessage}</ErrorMessage>
    {/if}

    <form
        on:submit|preventDefault={handleSubmit}
        method="post"
        name={FORM_NAME}
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
            className="w-full justify-center mb-1"
            disabled={submitting}
            on:click={handleSubmit}
            ><Localized id="login-form-submit" /></ButtonLarge
        >
        <GoogleAuthButton
            on:success={handleGoogleSignIn}
            on:click={() => (blockGoogleSignIn = false)}
            forceSignOut={blockGoogleSignIn}
            className="w-full justify-center mb-1"
            ><Localized id="login-form-google" />
        </GoogleAuthButton>
        <hr class="my-3" />
        <ButtonLarge
            href={joinUrl}
            variant="OUTLINED"
            className="w-full justify-center"
            ><Localized id="login-form-signup" /></ButtonLarge
        >
        <ButtonLarge
            href={resetPasswordUrl}
            variant="TEXT"
            color="SECONDARY"
            className="w-full justify-center"
            ><Localized id="login-form-reset-password" /></ButtonLarge
        >
    </form>
</div>
