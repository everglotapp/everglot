<script lang="ts">
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../../../components/layout/BrowserTitle.svelte"
    import PageTitle from "../../../components/typography/PageTitle.svelte"
    import ErrorMessage from "../../../components/util/ErrorMessage.svelte"
    import Spinner from "../../../components/util/Spinner.svelte"
    import ButtonLarge from "../../../components/util/ButtonLarge.svelte"
    import { inviteToken } from "../../../stores"

    let email: string | undefined

    let errorMessage: string | null = null
    let submitting = false
    let success: boolean | null = null

    const FORM_NAME = "reset-password" as const
    const handleSubmit = async (_event: Event) => {
        if (submitting) {
            return
        }
        if (!email || !email.length) {
            errorMessage = "Please enter an email address."
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
            email,
        })
        const res = await response?.json()
        if (!res || !res.hasOwnProperty("success")) {
            return
        }
        if (res.success === true) {
            success = true
        } else {
            errorMessage = res.message
        }
    }

    type ResetPasswordBody = {
        email: string
    }
    async function doSubmit(body: ResetPasswordBody): Promise<Response> {
        const response = await fetch("/users/password/reset", {
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

    $: joinUrl = $inviteToken ? `/join?token=${$inviteToken}` : "/join"
    $: loginUrl = $inviteToken ? `/login?token=${$inviteToken}` : "/login"
</script>

<Localized id="users-password-reset-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<div class="container px-4 mx-auto my-16 md:mt-32 max-w-sm">
    <img src="/logo-192.png" alt="Everglot" class="mx-auto mb-8" />

    <PageTitle>
        <Localized id="users-password-reset-form-title" />
    </PageTitle>

    {#if success}
        <div class="py-4 px-8 bg-green-100 text-xl font-bold font-secondary">
            An email has been sent to your mail address. Please follow the
            instructions to reset your password!
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
                <label for="email"
                    ><Localized id="users-password-reset-form-email" /></label
                >
                <input
                    id="email"
                    type="email"
                    bind:value={email}
                    placeholder="jane.doe@example.com"
                    required
                    class="py-2"
                />
            </div>
            <ButtonLarge
                tag="button"
                type="submit"
                className="w-full justify-center mb-1"
                disabled={submitting || success === true}
                on:click={handleSubmit}
                ><Localized
                    id="users-password-reset-form-submit"
                /></ButtonLarge
            >
            <hr class="my-3" />
            <ButtonLarge
                href={loginUrl}
                variant="OUTLINED"
                color="SECONDARY"
                className="w-full justify-center"
                ><Localized id="users-password-reset-form-login" /></ButtonLarge
            >
            <ButtonLarge
                href={joinUrl}
                variant="TEXT"
                color="SECONDARY"
                className="w-full justify-center"
                ><Localized
                    id="users-password-reset-form-signup"
                /></ButtonLarge
            >
        </form>
    {/if}
</div>
