<script lang="ts">
    import { goto } from "@sapper/app"

    import { username } from "../stores"

    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import GroupSelect from "../comp/util/GroupSelect.svelte"
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
    enum Gender {
        FEMALE = "f",
        MALE = "m",
        OTHER = "o",
    }

    let teach = {
        German: false,
        English: false,
    }
    let learn = {
        German: false,
        English: false,
    }
    let gender: Gender | null = null

    let items = [
        { value: "chocolate", label: "Chocolate" },
        { value: "pizza", label: "Pizza" },
        { value: "cake", label: "Cake" },
        { value: "chips", label: "Chips" },
        { value: "ice-cream", label: "Ice Cream" },
    ]

    let selectedValue = [{ value: "cake", label: "Cake" }]

    function handleSelect(event: CustomEvent) {
        console.log("selected item:", event.detail)
        // .. do something here 🙂
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
            <legend>What language(s) do you want to learn (2 max)?*</legend>
            <p class="helper-text">
                Please only choose languages that you really want to learn or
                already are learning.
            </p>
            <div class="form-control">
                <ButtonLarge
                    tag="button"
                    className="mr-1 mb-1"
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
                    className="mr-1 mb-1"
                    variant={learn.English ? "FILLED" : "OUTLINED"}
                    disabled={teach.English}
                    on:click={() => {
                        learn.English = !learn.English
                        if (learn.English) {
                            teach.English = false
                        }
                    }}>English</ButtonLarge
                >
                <GroupSelect {items} {selectedValue} on:select={handleSelect} />
                <!-- <input
                    class="inline-flex w-auto focus:border-primary focus:ring-primary focus:outline-primary"
                    type="text"
                    placeholder="Other …"
                    disabled={learn.English && learn.German}
                /> -->
            </div>
        </fieldset>
        <fieldset class="mb-4">
            <legend>What language(s) do you speak natively (2 max)?*</legend>
            <p class="helper-text">
                These are the languages that you could help others out with.
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
                    class="inline-flex w-auto focus:border-primary focus:ring-primary focus:outline-primary"
                    type="text"
                    disabled={teach.English && teach.German}
                    placeholder="Other …"
                />
            </div>
        </fieldset>
        <fieldset>
            <legend>What gender do you identify as?</legend>
            <p class="helper-text">
                We'll use this information only to optimize group compositions.
            </p>
            <div class="form-control">
                <ButtonLarge
                    tag="button"
                    className="mr-1 mb-1"
                    variant={gender === Gender.FEMALE ? "FILLED" : "OUTLINED"}
                    on:click={() =>
                        (gender =
                            gender === Gender.FEMALE ? null : Gender.FEMALE)}
                    >Female</ButtonLarge
                >
                <ButtonLarge
                    tag="button"
                    className="mr-1 mb-1"
                    variant={gender === Gender.MALE ? "FILLED" : "OUTLINED"}
                    on:click={() =>
                        (gender = gender === Gender.MALE ? null : Gender.MALE)}
                    >Male</ButtonLarge
                >
                <ButtonLarge
                    tag="button"
                    variant={gender === Gender.OTHER ? "FILLED" : "OUTLINED"}
                    on:click={() =>
                        (gender =
                            gender === Gender.OTHER ? null : Gender.OTHER)}
                    >Other</ButtonLarge
                >
            </div>
        </fieldset>
        <ButtonLarge
            tag="button"
            className="w-full justify-center"
            on:click={setUsername}
            >Next<ArrowRightIcon
                class="ml-2 self-center"
                size="24"
            /></ButtonLarge
        >
    </form>
</div>

<style>
    label {
        @apply px-0;
    }

    label,
    legend {
        @apply text-sm flex font-bold text-gray-bitdark mb-1;
    }

    .helper-text {
        @apply text-sm text-gray-bitdark my-0 mb-1;
    }

    input {
        @apply rounded-xl px-4 py-3 mb-3 my-1 border border-gray-light;
    }

    input:disabled,
    input[disabled] {
        @apply cursor-not-allowed text-gray-light;
    }

    fieldset {
        @apply mb-4;
    }
</style>
