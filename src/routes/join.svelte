<script lang="ts">
    import { goto } from "@sapper/app"

    import PageTitle from "../comp/typography/PageTitle.svelte"
    import ErrorMessage from "../comp/util/ErrorMessage.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import { signedIn } from "../stores"
    import { MIN_PASSWORD_LENGTH } from "../users"

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
        errorMessage = null
        fetch("/join", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                token:
                    typeof window === "undefined"
                        ? null
                        : new URL(window.location.href).searchParams.get(
                              "token"
                          ),
            }),
        })
            .then(async (response) => {
                const res = await response.json()
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
            .then(() => {
                submitting = false
            })
    }
    let email = ""
    let password = ""
</script>

<svelte:head>
    <title>Join – Everglot</title>
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta
        name="google-signin-client_id"
        content="457984069949-bgc3aj14fi47olkp0arn7is4cr07cfla.apps.googleusercontent.com"
    />
    <script type="text/javascript">
        function onSignIn(googleUser) {
            var profile = googleUser.getBasicProfile()
            console.log("ID: " + profile.getId()) // Do not send to your backend! Use an ID token instead.
            console.log("Name: " + profile.getName())
            console.log("Image URL: " + profile.getImageUrl())
            console.log("Email: " + profile.getEmail())
        }
    </script>
</svelte:head>

<div class="container px-4 mx-auto my-16 max-w-sm">
    <PageTitle>Join Everglot</PageTitle>

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
        <p class="my-5 text-gray-bitdark text-sm">
            By signing up you agree to our <a
                href="https://everglot.com/privacy"
                class="font-normal">privacy policy</a
            >.
        </p>
        <div class="flex flex-col items-center">
            <button
                type="submit"
                disabled={submitting}
                on:click={handleSubmit}
                class="py-3 px-10 w-full mb-1 bg-primary hover:bg-primary-bitlight text-white rounded-xl font-bold"
                >Create a new account</button
            >
            <div
                class="g-signin2 flex justify-center mt-2 mb-1"
                data-onsuccess="onSignIn"
                data-longtitle="true"
            />
            <ButtonLarge
                href="login"
                variant="TEXT"
                className="w-full justify-center"
                >I already have an account</ButtonLarge
            >
        </div>
    </form>
</div>
