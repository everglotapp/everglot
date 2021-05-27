<script lang="ts">
    import { goto } from "@sapper/app"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../comp/layout/BrowserTitle.svelte"
    import PageTitle from "../comp/typography/PageTitle.svelte"
    import ErrorMessage from "../comp/util/ErrorMessage.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import GoogleAuthButton from "./_helpers/auth/GoogleAuthButton.svelte"

    import { AuthMethod, MIN_PASSWORD_LENGTH } from "../users"
    import { username } from "../stores"

    let errorMessage: string | null = null
    let submitting = false

    const handleSubmit = async (_event: Event) => {
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
        errorMessage = null
        const response = await doSubmit({
            method: AuthMethod.EMAIL,
            email,
            password,
            token:
                typeof window === "undefined"
                    ? null
                    : new URL(window.location.href).searchParams.get("token"),
        })
        const res = await response.json()
        if (!res.hasOwnProperty("success")) {
            return
        }
        if (res.success === true) {
            goto("/signup")
        } else {
            errorMessage = res.message
        }
    }

    type SubmitBody = {
        method: AuthMethod
        token?: string | null
        idToken?: string
        email?: string
        password?: string
    }
    async function doSubmit(body: SubmitBody): Promise<Response> {
        return fetch("/join", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        }).then(async (response: Response) => {
            submitting = false
            return response
        })
    }

    async function handleGoogleSignIn(
        event: CustomEvent<{ googleUser: gapi.auth2.GoogleUser }>
    ) {
        const { googleUser } = event.detail
        $username = googleUser.getBasicProfile().getName() || $username
        const response = await doSubmit({
            method: AuthMethod.GOOGLE,
            idToken: googleUser.getAuthResponse().id_token,
            token:
                typeof window === "undefined"
                    ? null
                    : new URL(window.location.href).searchParams.get("token"),
        })
        const res = await response.json()
        if (!res.hasOwnProperty("success")) {
            return
        }
        if (res.success === true) {
            goto("/signup")
        } else {
            errorMessage = res.message
        }
    }

    let email = ""
    let password = ""
</script>

<Localized id="join-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<div class="container px-4 mx-auto my-16 md:mt-32 max-w-sm">
    <PageTitle>
        <Localized id="join-title" />
    </PageTitle>

    {#if errorMessage}
        <ErrorMessage>{errorMessage}</ErrorMessage>
    {/if}

    <form
        on:submit|preventDefault={handleSubmit}
        name="join"
        method="post"
        class="bg-white my-8"
    >
        <div class="flex flex-col w-full mb-2">
            <label for="email"><Localized id="join-form-email" /></label>
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
            <label for="password"><Localized id="join-form-password" /></label>
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
        <p class="my-5 text-gray-bitdark text-sm">
            By signing up you agree to our <a
                href="https://everglot.com/privacy"
                class="font-normal">privacy policy</a
            >.
        </p>
        <ButtonLarge
            tag="button"
            type="submit"
            className="w-full justify-center mb-1"
            disabled={submitting}
            on:click={handleSubmit}
            ><Localized id="join-form-submit" /></ButtonLarge
        >
        <GoogleAuthButton
            on:success={handleGoogleSignIn}
            className="w-full justify-center mb-1"
            ><Localized id="join-form-google" />
        </GoogleAuthButton>
        <ButtonLarge
            href="login"
            variant="TEXT"
            className="w-full justify-center"
            ><Localized id="join-form-login" /></ButtonLarge
        >
    </form>
</div>
