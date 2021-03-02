<script lang="ts">
    import { goto } from "@sapper/app"
    import { getLocales } from "@marcelovicentegc/i18n-iso-languages"

    import { username, room } from "../stores"
    import { MAX_LEARNING, MAX_TEACHING, Gender, CefrLevel } from "../users"

    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import GroupSelect from "../comp/util/GroupSelect.svelte"
    import PageTitle from "../comp/typography/PageTitle.svelte"

    import { ArrowRightIcon } from "svelte-feather-icons"

    const locales = getLocales()

    let teach: Record<string, boolean> = {
        de: false,
        en: false,
    }
    let learn: Record<string, boolean> = {
        de: false,
        en: false,
    }

    type LanguageItem = { value: string; label: string }
    let items: LanguageItem[] = locales
        .filter((locale) => !["en", "de"].includes(locale.ISO6391))
        .map((locale) => ({
            value: locale.ISO6391,
            label: locale.officialLanguage,
        }))

    let learnOther: LanguageItem[] = []
    let teachOther: LanguageItem[] = []

    let learningLevels: Record<string, CefrLevel | ""> = {
        en: "",
        de: "",
        ...Object.fromEntries(items.map((item) => [item.value, ""])),
    }

    $: totalTeaching =
        Object.values(teach)
            .map(Number)
            .reduce((n, i) => n + i) + teachOther.length
    $: totalLearning =
        Object.values(learn)
            .map(Number)
            .reduce((n, i) => n + i) + learnOther.length

    $: learningCodes = [
        ...Object.keys(learn).filter((code) => learn[code]),
        ...learnOther.map((item) => item.value),
    ]

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
        learnOther = [...(event.detail || [])]
    }
    function handleSelectTeachOther(event: CustomEvent<LanguageItem[] | null>) {
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
        const teachingCodes = [
            ...Object.keys(teach).filter((code) => teach[code]),
            ...teachOther.map((item) => item.value),
        ]
        fetch("/profile/", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: $username,
                gender,
                teach: teachingCodes,
                learn: learningCodes,
                cefrLevels: learningLevels,
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
                        $room = learn.en
                            ? "English"
                            : learn.de
                            ? "German"
                            : learnOther[0].label
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
        <fieldset class="mb-2">
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
                >What language(s) are you interested in ({MAX_LEARNING} max)?*</legend
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
                    hideInput={totalLearning >= MAX_LEARNING}
                    on:select={handleSelectLearnOther}
                />
            </div>
        </fieldset>
        {#if learningCodes.length}
            <fieldset class="mt-1 mb-3">
                <legend>Your level in …</legend>
                {#each learningCodes as code}
                    <div class="level flex items-center py-1">
                        <label for={`level_${code}`}>
                            {locales.find((locale) => locale.ISO6391 === code)
                                ?.officialLanguage}:
                        </label>
                        <div>
                            <select
                                id={`level_${code}`}
                                bind:value={learningLevels[code]}
                                required
                                placeholder="Your level …"
                            >
                                <option value="">Please select …</option>
                                <option value={CefrLevel.A1}
                                    >A1 – Beginner</option
                                >
                                <option value={CefrLevel.A2}
                                    >A2 – Elementary</option
                                >
                                <option value={CefrLevel.B1}
                                    >B1 – Intermediate</option
                                >
                                <option value={CefrLevel.B2}
                                    >B2 – Upper intermediate</option
                                >
                                <option value={CefrLevel.C1}
                                    >C1 – Advanced</option
                                >
                                <option value={CefrLevel.C2}
                                    >C2 – Proficient</option
                                >
                            </select>
                        </div>
                    </div>
                    {#if learningLevels[code] === CefrLevel.A1 || learningLevels[code] === CefrLevel.A2}
                        <div class="warning-skill">
                            <p>
                                Everglot is not recommended for {learningLevels[
                                    code
                                ] === CefrLevel.A1
                                    ? "beginners"
                                    : "elementary level learners"}, yet.
                            </p>
                            <p>
                                You can still continue. Please be aware that it
                                may be very difficult for you to follow along.
                            </p>
                        </div>
                    {/if}
                {/each}
            </fieldset>
        {/if}
        <fieldset class="my-4">
            <legend
                >What language(s) could you help others out with ({MAX_TEACHING}
                max)?*</legend
            >
            <p class="helper-text">
                These are languages that you either speak natively or on a
                near-native level.
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
                    hideInput={totalTeaching >= MAX_TEACHING}
                    on:select={handleSelectTeachOther}
                />
            </div>
        </fieldset>
        <fieldset class="mb-4">
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

    .level {
        @apply justify-between max-w-xs mb-2;
    }

    .level label {
        @apply font-normal text-base m-0 !important;
    }

    .level select {
        @apply pr-8 !important;
    }

    .warning-skill {
        @apply px-6 py-4 my-1 rounded-2xl bg-gray-lightest font-bold text-gray-dark;
    }

    .warning-skill p:last-child {
        @apply m-0;
    }
</style>
