<script lang="ts">
    import { goto } from "@sapper/app"
    import { username } from "../stores"

    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import PageTitle from "../comp/typography/PageTitle.svelte"

    import { ArrowRightIcon } from "svelte-feather-icons"

    function setUsername() {
        const form = document.forms[0]
        if (form.name !== "set-username") {
            return
        }
        if (form.reportValidity()) {
            goto("/chat")
        }
    }

    let teach = {
        German: false,
        English: false,
    }
    let learn = {
        German: false,
        English: false,
    }
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<div class="container max-w-2xl px-4 py-8 md:py-16">
    <PageTitle>Tell us a little bit about yourself</PageTitle>
    <form
        name="set-username"
        action="/chat"
        class="py-10 md:px-8"
        on:submit|preventDefault={setUsername}
    >
        <fieldset>
            <div class="form-control">
                <label for="username">Pick a username*</label>
                <p class="helper-text">
                    The others will see you under this name.
                </p>
                <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username …"
                    required
                    bind:value={$username}
                />
            </div>
        </fieldset>
        <fieldset>
            <legend>What language(s) do you want to learn?*</legend>
            <p class="helper-text">
                Please only choose languages that you are already learning or
                really interested in learning.
            </p>
            <div class="form-control">
                <ButtonLarge
                    tag="button"
                    className="mr-1"
                    variant={learn.German ? "FILLED" : "OUTLINED"}
                    disabled={teach.German}
                    on:click={() => {
                        learn.German = !learn.German
                        if (learn.German) {
                            teach.German = false
                        }
                    }}>German</ButtonLarge
                >
                <ButtonLarge
                    tag="button"
                    className="mr-1"
                    variant={learn.English ? "FILLED" : "OUTLINED"}
                    disabled={teach.English}
                    on:click={() => {
                        learn.English = !learn.English
                        if (learn.English) {
                            teach.English = false
                        }
                    }}>English</ButtonLarge
                >
                <input
                    class="inline-flex w-auto"
                    type="text"
                    placeholder="Other …"
                />
            </div>
        </fieldset>
        <fieldset>
            <legend>What language(s) do you speak natively?*</legend>
            <p class="helper-text">
                These are the languages that you could help others learn.
            </p>
            <div class="form-control">
                <ButtonLarge
                    tag="button"
                    className="mr-1"
                    variant={teach.German ? "FILLED" : "OUTLINED"}
                    disabled={learn.German}
                    on:click={() => {
                        teach.German = !teach.German
                        if (teach.German) {
                            learn.German = false
                        }
                    }}>German</ButtonLarge
                >
                <ButtonLarge
                    tag="button"
                    className="mr-1"
                    variant={teach.English ? "FILLED" : "OUTLINED"}
                    disabled={learn.English}
                    on:click={() => {
                        teach.English = !teach.English
                        if (teach.English) {
                            learn.English = false
                        }
                    }}>English</ButtonLarge
                >
                <input
                    class="inline-flex w-auto"
                    type="text"
                    placeholder="Other …"
                />
            </div>
        </fieldset>
        <ButtonLarge
            tag="button"
            className="w-full justify-center"
            on:click={setUsername}
            >Next<ArrowRightIcon size="20" class="ml-2" /></ButtonLarge
        >
    </form>
</div>

<style>
    label,
    legend {
        @apply flex font-bold text-gray-bitdark mb-1;
    }

    .helper-text {
        @apply text-sm text-gray-bitdark my-0;
    }

    input,
    select {
        @apply rounded-xl px-4 py-3 mb-3 my-1 border border-gray-light;
    }
    [type="text"]:focus,
    [type="email"]:focus,
    [type="url"]:focus,
    [type="password"]:focus,
    [type="number"]:focus,
    [type="date"]:focus,
    [type="datetime-local"]:focus,
    [type="month"]:focus,
    [type="search"]:focus,
    [type="tel"]:focus,
    [type="time"]:focus,
    [type="week"]:focus,
    [multiple]:focus,
    textarea:focus,
    select:focus {
        @apply border-primary ring-primary;
    }

    fieldset {
        @apply mb-4;
    }
</style>
