<script lang="ts">
    import { stores, goto } from "@sapper/app"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import Time from "svelte-time"

    import Spinner from "../../../../comp/util/Spinner.svelte"
    import BrowserTitle from "../../../../comp/layout/BrowserTitle.svelte"
    import PageTitle from "../../../../comp/typography/PageTitle.svelte"
    import ErrorMessage from "../../../../comp/util/ErrorMessage.svelte"
    import ButtonLarge from "../../../../comp/util/ButtonLarge.svelte"

    import { MIN_PASSWORD_LENGTH } from "../../../../users"
    import { inviteToken, resetPasswordToken } from "../../../../stores"
    import { onDestroy } from "svelte"
    const { page } = stores()

    let password: string | undefined
    let passwordConfirm: string | undefined

    let errorMessage: string | null = null
    let submitting = false
    let success: boolean | null = null

    $: if ($resetPasswordToken === null) {
        $resetPasswordToken = $page.params.token || null
    }

    let redirectTimeout: number | null = null
    let redirectAt: Date | null = null
    let recalculateRemainingSecondsInterval: number | null = null
    onDestroy(() => {
        if (redirectTimeout) {
            clearTimeout(redirectTimeout)
            redirectTimeout = null
        }
        if (recalculateRemainingSecondsInterval) {
            clearInterval(recalculateRemainingSecondsInterval)
            recalculateRemainingSecondsInterval = null
        }
    })
    const REDIRECT_DELAY_MS = 5000
    const FORM_NAME = "update-password" as const
    const handleSubmit = async (_event: Event) => {
        if (submitting) {
            return
        }
        if (!password || !password.length) {
            errorMessage = "Please enter a valid password."
            return
        }
        if (!passwordConfirm || !passwordConfirm.length) {
            errorMessage =
                "Please confirm your new password by typing it into the confirmation field as well."
            return
        }
        if (password !== passwordConfirm) {
            errorMessage = "The two passwords don't match."
            return
        }
        if (!$resetPasswordToken) {
            errorMessage =
                "Submitting won't work. Please request a new email using the button at the bottom of this page."
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
            token: $resetPasswordToken,
            password,
        })
        const res = await response?.json()
        if (!res || !res.hasOwnProperty("success")) {
            return
        }
        if (res.success === true) {
            success = true
            redirectTimeout = window.setTimeout(() => {
                // TODO: Pre-enter new password in login form
                goto(loginUrl)
            }, REDIRECT_DELAY_MS)
            redirectAt = new Date(Date.now() + REDIRECT_DELAY_MS)
            updateRemainingSeconds()
            recalculateRemainingSecondsInterval = window.setInterval(
                updateRemainingSeconds,
                100
            )
        } else {
            errorMessage = res.message
        }
    }

    let remainingSeconds: number | null = null
    function updateRemainingSeconds() {
        remainingSeconds =
            redirectAt === null
                ? null
                : Math.round((redirectAt.getTime() - Date.now()) / 1000)
    }

    type UpdatePasswordBody = {
        password: string
        token: string
    }
    async function doSubmit(body: UpdatePasswordBody): Promise<Response> {
        const response = await fetch("/users/password/reset/update", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        submitting = false
        return response
    }

    const resendUrl = "/users/password/reset"
    $: loginUrl = $inviteToken ? `/login?token=${$inviteToken}` : "/login"
</script>

<Localized id="users-password-reset-browser-token-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<div class="container px-4 mx-auto my-16 md:mt-32 max-w-sm">
    <img src="/logo-192.png" alt="Everglot" class="mx-auto mb-8" />

    <PageTitle>
        <Localized id="users-password-reset-token-form-title" />
    </PageTitle>

    {#if success}
        <div class="py-4 px-8 bg-green-200 text-xl font-bold font-secondary">
            Your password has been updated successfully! You will be redirected
            in {remainingSeconds === null ? "?" : remainingSeconds}
            {remainingSeconds === 1 ? "second" : "seconds"}!
        </div>
    {:else if errorMessage}
        <ErrorMessage>{errorMessage}</ErrorMessage>
    {/if}

    {#if submitting}
        <div class="container max-w-2xl my-16 flex items-center justify-center">
            <Spinner />
        </div>
    {:else}
        <form
            on:submit|preventDefault={handleSubmit}
            name={FORM_NAME}
            method="post"
            class="bg-white my-8"
        >
            <div class="flex flex-col w-full mb-2">
                <label for="password"
                    ><Localized
                        id="users-password-reset-token-form-password"
                    /></label
                >
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
            <div class="flex flex-col w-full mb-2">
                <label for="password-confirm"
                    ><Localized
                        id="users-password-reset-token-form-password-confirm"
                    /></label
                >
                <input
                    id="password-confirm"
                    type="password"
                    minlength={MIN_PASSWORD_LENGTH}
                    pattern={`.{${MIN_PASSWORD_LENGTH},}`}
                    title={`${MIN_PASSWORD_LENGTH} characters minimum`}
                    bind:value={passwordConfirm}
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
                ><Localized
                    id="users-password-reset-token-form-submit"
                /></ButtonLarge
            >
            <hr class="my-3" />
            <ButtonLarge
                tag="a"
                href={resendUrl}
                type="submit"
                variant="TEXT"
                color="SECONDARY"
                className="w-full justify-center mb-1"
                ><Localized
                    id="users-password-reset-token-form-resend"
                /></ButtonLarge
            >
        </form>
    {/if}
</div>
