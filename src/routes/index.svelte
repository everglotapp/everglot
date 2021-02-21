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
                <label for="username">Pick a username *</label>
                <p class="text-xs text-gray-bitdark my-0">
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
            <legend>What language(s) do you speak natively? *</legend>
            <p class="text-xs text-gray-bitdark my-0 mb-1">
                These are the languages that you could help others learn.
            </p>
            <div class="form-control">
                <ButtonLarge
                    tag="button"
                    className="mr-1"
                    variant={teach.German ? "FILLED" : "OUTLINED"}
                    on:click={() => {
                        teach.German = !teach.German
                    }}>German</ButtonLarge
                >
                <ButtonLarge
                    tag="button"
                    className="mr-1"
                    variant={teach.English ? "FILLED" : "OUTLINED"}
                    on:click={() => {
                        teach.English = !teach.English
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
            <legend>What language(s) do you want to learn? *</legend>
            <p class="text-xs text-gray-bitdark my-0 mb-1">
                Please only choose languages that you are already learning or
                really interested in learning.
            </p>
            <div class="form-control">
                <ButtonLarge
                    tag="button"
                    className="mr-1"
                    variant={learn.German ? "FILLED" : "OUTLINED"}
                    on:click={() => {
                        learn.German = !learn.German
                    }}>German</ButtonLarge
                >
                <ButtonLarge
                    tag="button"
                    className="mr-1"
                    variant={learn.English ? "FILLED" : "OUTLINED"}
                    on:click={() => {
                        learn.English = !learn.English
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
            <legend>What timezone are you in? *</legend>
            <div class="form-control">
                <select class="w-full md:w-auto">
                    <option>GMT</option>
                </select>
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
        @apply flex font-bold text-gray-bitdark text-sm mb-1;
    }

    input,
    select {
        @apply shadow-md rounded-xl px-4 py-3 mb-3 my-1 border border-gray-lightest;
    }

    fieldset {
        @apply mb-4;
    }
</style>
