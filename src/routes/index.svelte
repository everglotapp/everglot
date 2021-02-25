<script lang="ts">
    import { goto } from "@sapper/app"

    import { username } from "../stores"

    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import GroupSelect from "../comp/util/GroupSelect.svelte"
    import PageTitle from "../comp/typography/PageTitle.svelte"

    import { ArrowRightIcon } from "svelte-feather-icons"

    const MAX_LEARNING = 2
    const MAX_TEACHING = 2
    enum Gender {
        FEMALE = "f",
        MALE = "m",
        OTHER = "o",
    }

    let teach = {
        de: false,
        en: false,
    }
    let learn = {
        de: false,
        en: false,
    }

    type LanguageItem = { value: string; label: string }
    let items: LanguageItem[] = [
        { value: "zh", label: "Chinese" },
        { value: "es", label: "Spanish" },
        { value: "ar", label: "Arabic" },
        { value: "it", label: "Italian" },
        { value: "jp", label: "Japanese" },
    ]
    let learnOther: LanguageItem[] = []
    let teachOther: LanguageItem[] = []

    $: totalTeaching =
        Object.values(teach)
            .map(Number)
            .reduce((n, i) => n + i) + teachOther.length
    $: totalLearning =
        Object.values(learn)
            .map(Number)
            .reduce((n, i) => n + i) + learnOther.length

    $: learnable =
        totalLearning >= MAX_LEARNING
            ? []
            : items.filter((item) => {
                  const lang = item.value
                  return Object.keys(learn).includes(lang)
                      ? !learn[lang as keyof typeof learn]
                      : !teachOther.find(({ value }) => value === lang)
              })
    $: teachable =
        totalTeaching >= MAX_TEACHING
            ? []
            : items.filter((item) => {
                  const lang = item.value
                  return Object.keys(teach).includes(lang)
                      ? !teach[lang as keyof typeof teach]
                      : !learnOther.find(({ value }) => value === lang)
              })

    function handleSelectLearnOther(event: CustomEvent<LanguageItem[] | null>) {
        console.log("learnOther", event.detail)
        learnOther = [...(event.detail || [])]
    }
    function handleSelectTeachOther(event: CustomEvent<LanguageItem[] | null>) {
        console.log("teachOther", event.detail)
        teachOther = [...(event.detail || [])]
    }

    function toggleLearn(lang: keyof typeof teach & keyof typeof learn) {
        learn = {
            ...learn,
            [lang]: !learn[lang],
        }
        if (learn[lang]) {
            teach = { ...teach, [lang]: false }
        }
    }

    function toggleTeach(lang: keyof typeof teach & keyof typeof learn) {
        teach = {
            ...teach,
            [lang]: !teach[lang],
        }
        if (teach[lang]) {
            learn = { ...learn, [lang]: false }
        }
    }

    let gender: Gender | null = null
    function toggleGender(pickedGender: Gender) {
        return (gender = gender === pickedGender ? null : pickedGender)
    }

    let submitting = false
    function handleSubmit() {
        const form = document.forms[0]
        if (form.name !== "user-profile") {
            return
        }
        // TODO: replace with JS form validation
        if (!form.reportValidity()) {
            // TODO: give feedback that submission failed and why
            return
        }
        submitting = true
        fetch("/profile/", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: $username,
                gender,
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
                        goto("/chat")
                    } else {
                        // TODO: Submission failed. Give feedback.
                    }
                })
            })
            .then(() => {
                submitting = false
            })
    }
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<div class="container max-w-2xl px-4 py-8 md:py-16">
    <PageTitle>Tell us a little bit about yourself</PageTitle>
    <form
        name="user-profile"
        action="/chat"
        class="py-10 md:px-8"
        on:submit|preventDefault={handleSubmit}
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
            <legend
                >What language(s) do you want to learn ({MAX_LEARNING} max)?*</legend
            >
            <p class="helper-text">
                Please only choose languages that you really want to learn or
                already are learning.
            </p>
            <div class="form-control">
                <ButtonSmall
                    tag="button"
                    className="mr-1 mb-1"
                    variant={learn.de ? "FILLED" : "OUTLINED"}
                    disabled={teach.de ||
                        (!learn.de && totalLearning >= MAX_LEARNING)}
                    on:click={() => toggleLearn("de")}>German</ButtonSmall
                >
                <ButtonSmall
                    tag="button"
                    className="mr-1 mb-1"
                    variant={learn.en ? "FILLED" : "OUTLINED"}
                    disabled={teach.en ||
                        (!learn.en && totalLearning >= MAX_LEARNING)}
                    on:click={() => toggleLearn("en")}>English</ButtonSmall
                >
                <GroupSelect
                    items={learnable}
                    selected={learnOther.length ? learnOther : null}
                    on:select={handleSelectLearnOther}
                />
            </div>
        </fieldset>
        <fieldset class="mb-4">
            <legend
                >What language(s) do you speak natively ({MAX_TEACHING} max)?*</legend
            >
            <p class="helper-text">
                These are languages that you could help others out with.
            </p>
            <div class="form-control">
                <ButtonSmall
                    tag="button"
                    className="mr-1"
                    variant={teach.de ? "FILLED" : "OUTLINED"}
                    disabled={learn.de ||
                        (!teach.de && totalTeaching >= MAX_TEACHING)}
                    on:click={() => toggleTeach("de")}>German</ButtonSmall
                >
                <ButtonSmall
                    tag="button"
                    className="mr-1"
                    variant={teach.en ? "FILLED" : "OUTLINED"}
                    disabled={learn.en ||
                        (!teach.en && totalTeaching >= MAX_TEACHING)}
                    on:click={() => toggleTeach("en")}>English</ButtonSmall
                >
                <GroupSelect
                    items={teachable}
                    selected={teachOther.length ? teachOther : null}
                    on:select={handleSelectTeachOther}
                />
            </div>
        </fieldset>
        <fieldset>
            <legend>What gender do you identify as?</legend>
            <p class="helper-text">
                We'll use this information only to optimize group compositions.
            </p>
            <div class="form-control">
                <ButtonSmall
                    tag="button"
                    className="mr-1 mb-1"
                    variant={gender === Gender.FEMALE ? "FILLED" : "OUTLINED"}
                    on:click={() => toggleGender(Gender.FEMALE)}
                    >Female</ButtonSmall
                >
                <ButtonSmall
                    tag="button"
                    className="mr-1 mb-1"
                    variant={gender === Gender.MALE ? "FILLED" : "OUTLINED"}
                    on:click={() => toggleGender(Gender.MALE)}>Male</ButtonSmall
                >
                <ButtonSmall
                    tag="button"
                    variant={gender === Gender.OTHER ? "FILLED" : "OUTLINED"}
                    on:click={() => toggleGender(Gender.OTHER)}
                    >Other</ButtonSmall
                >
            </div>
        </fieldset>
        <ButtonLarge
            tag="button"
            className="w-full justify-center"
            on:click={handleSubmit}
            disabled={submitting}
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
