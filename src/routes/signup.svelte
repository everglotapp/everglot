<script lang="ts">
    import { goto } from "@sapper/app"
    import { scale } from "svelte/transition"

    import { Localized, Overlay } from "@nubolab-ffwd/svelte-fluent"

    import type { Language } from "../types/generated/graphql"
    import { query } from "@urql/svelte"

    import {
        userHasCompletedProfile,
        username,
        languageCodeMappings,
    } from "../stores"
    import { currentUser, currentUserStore } from "../stores/currentUser"
    import {
        MAX_LEARNING,
        MAX_TEACHING,
        Gender,
        CefrLevel,
        MIN_USERNAME_LENGTH,
    } from "../users"

    import BrowserTitle from "../comp/layout/BrowserTitle.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import GroupSelect from "../comp/util/GroupSelect.svelte"
    import ErrorMessage from "../comp/util/ErrorMessage.svelte"
    import PageTitle from "../comp/typography/PageTitle.svelte"

    import { ArrowRightIcon, ClockIcon } from "svelte-feather-icons"
    import { stores as fluentStores } from "@nubolab-ffwd/svelte-fluent/src/internal/FluentProvider.svelte"
    const { translate } = fluentStores()!

    query(languageCodeMappings)
    query(currentUserStore)

    let prefilled = false

    $: if ($userHasCompletedProfile) {
        // Profile has already been completed, a second time won't work.
        goto("/signup/success", { replaceState: true, noscroll: false })
    }

    $: if ($currentUser !== null && !prefilled) {
        // Pre-fill form.
        prefilled = true
        $username = $currentUser.username || $username
        if ($currentUser.languageByLocale) {
            const { alpha2 } = $currentUser.languageByLocale
            let foundItem = items.find((item) => item.value === alpha2)
            if (foundItem) {
                teaching = [...teaching, foundItem]
            }
        }
    }

    let errorMessage: string | null = null

    let languages: Pick<Language, "englishName" | "alpha2">[] = []
    $: if (!$languageCodeMappings.fetching && $languageCodeMappings.data) {
        languages =
            $languageCodeMappings.data?.languages?.nodes
                .filter(Boolean)
                .map((node) => node!) || []
    }
    type LanguageItem = { value: string; label: string }
    let items: LanguageItem[] = []
    $: items = languages.map(({ alpha2, englishName }) => ({
        value: alpha2,
        label: englishName,
    }))

    let learning: LanguageItem[] = []
    let teaching: LanguageItem[] = []

    let learningLevels: Record<string, CefrLevel | ""> = {
        en: "",
        de: "",
        zh: "",
        ...Object.fromEntries(items.map((item) => [item.value, ""])),
    }

    $: totalTeaching = teaching.length
    $: totalLearning = learning.length

    $: learningCodes = learning.map((item) => item.value)

    $: learnable =
        totalLearning >= MAX_LEARNING
            ? []
            : items.filter((item) => {
                  const lang = item.value
                  return !teaching.find(({ value }) => value === lang)
              })
    $: teachable =
        totalTeaching >= MAX_TEACHING
            ? []
            : items.filter((item) => {
                  const lang = item.value
                  return !learning.find(({ value }) => value === lang)
              })

    function handleSelectLearning(event: CustomEvent<LanguageItem[] | null>) {
        learning = [...(event.detail || [])]
    }
    function handleSelectTeaching(event: CustomEvent<LanguageItem[] | null>) {
        teaching = [...(event.detail || [])]
    }

    let gender: Gender | null = null
    function toggleGender(pickedGender: Gender) {
        return (gender = gender === pickedGender ? null : pickedGender)
    }

    let submitting = false
    async function handleSubmit() {
        if (submitting) {
            return
        }

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
        errorMessage = null
        const teachingCodes = teaching.map((item) => item.value)
        const response = await fetch("/signup", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: $username,
                gender,
                teaching: teachingCodes,
                learning: learningCodes,
                cefrLevels: Object.entries(learningLevels).reduce(
                    (levels, [code, level]) =>
                        learningCodes.includes(code)
                            ? { ...levels, [code]: level }
                            : levels,
                    {}
                ),
            }),
            redirect: "follow", // if user isn't signed in anymore
        })
        const res = await response.json()
        if (!res.hasOwnProperty("success")) {
            submitting = false
            return
        }
        if (res.success === true) {
            window.location.href = "/signup/success"
        } else {
            errorMessage = res.message
        }
        submitting = false
    }
</script>

<Localized id="signup-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

{#if $languageCodeMappings.fetching}
    <div />
{:else if $languageCodeMappings.error}
    <p class="container max-w-2xl px-4 py-8 md:py-8">
        <Localized id="signup-form-error-loading-language-codes" />
        <ErrorMessage>{$languageCodeMappings.error.message}</ErrorMessage>
    </p>
{:else}
    <div class="container max-w-2xl px-4 py-8 md:py-8" in:scale|local>
        <PageTitle><Localized id="signup-title" /></PageTitle>

        <form
            name="user-profile"
            action="/chat"
            class="py-8 md:px-8"
            on:submit|preventDefault={handleSubmit}
        >
            <fieldset class="mb-2">
                <div class="form-control">
                    <label for="username"
                        ><Localized id="signup-form-username-label" /></label
                    >
                    <p class="helper-text">
                        <Localized id="signup-form-username-helper" />
                    </p>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={$translate(
                            "signup-form-username-placeholder"
                        )}
                        required
                        minlength={MIN_USERNAME_LENGTH}
                        pattern={`.{${MIN_USERNAME_LENGTH},}`}
                        title={`${MIN_USERNAME_LENGTH} characters minimum`}
                        class="w-full max-w-sm"
                        bind:value={$username}
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>
                    <Localized
                        id="signup-form-learning-label"
                        args={{ max: MAX_LEARNING }}
                    />
                </legend>
                <p class="helper-text">
                    <Localized id="signup-form-learning-helper" />
                </p>
                <div class="form-control">
                    <GroupSelect
                        items={learnable}
                        selected={learning.length ? learning : null}
                        hideInput={totalLearning >= MAX_LEARNING}
                        on:select={handleSelectLearning}
                        placeholder={$translate(
                            "signup-form-learning-placeholder"
                        )}
                    />
                </div>
            </fieldset>
            {#if learningCodes.length}
                <fieldset class="mt-1 mb-3">
                    <legend
                        ><Localized
                            id="signup-form-learning-levels-legend"
                        /></legend
                    >
                    {#each learningCodes as code}
                        <div class="level flex items-center py-1">
                            <label for={`level_${code}`}>
                                {languages
                                    .filter(({ alpha2 }) => alpha2 === code)
                                    .map(
                                        (language) => language.englishName
                                    )[0] || ""}:
                            </label>
                            <div>
                                <select
                                    id={`level_${code}`}
                                    bind:value={learningLevels[code]}
                                    required
                                    placeholder={$translate(
                                        "signup-form-learning-levels-select-placeholder"
                                    )}
                                >
                                    <option value=""
                                        ><Localized
                                            id="signup-form-learning-levels-select-empty"
                                        /></option
                                    >
                                    <option value={CefrLevel.A1}
                                        ><Localized
                                            id="signup-form-learning-levels-select-a1"
                                        /></option
                                    >
                                    <option value={CefrLevel.A2}
                                        ><Localized
                                            id="signup-form-learning-levels-select-a2"
                                        /></option
                                    >
                                    <option value={CefrLevel.B1}
                                        ><Localized
                                            id="signup-form-learning-levels-select-b1"
                                        /></option
                                    >
                                    <option value={CefrLevel.B2}
                                        ><Localized
                                            id="signup-form-learning-levels-select-b2"
                                        /></option
                                    >
                                    <option value={CefrLevel.C1}
                                        ><Localized
                                            id="signup-form-learning-levels-select-c1"
                                        /></option
                                    >
                                    <option value={CefrLevel.C2}
                                        ><Localized
                                            id="signup-form-learning-levels-select-c2"
                                        /></option
                                    >
                                </select>
                            </div>
                        </div>
                    {/each}
                    {#if Object.keys(learningLevels).some((code) => learningLevels[code] === CefrLevel.A1 || learningLevels[code] === CefrLevel.A2)}
                        <div
                            class="warning-skill"
                            in:scale={{ duration: 150, delay: 150 }}
                            out:scale={{ duration: 150 }}
                        >
                            <div class="warning-inner-with-icon">
                                <div>
                                    <span style="font-size: 32px;"
                                        >&#x1F62C;</span
                                    >
                                </div>
                                <div>
                                    <Overlay id="signup-form-difficult-msg">
                                        <p data-l10n-name="difficult" />
                                        <p data-l10n-name="no-problem" />
                                    </Overlay>
                                </div>
                            </div>
                        </div>
                    {/if}
                    {#if learning.length}
                        <div
                            class="warning-learn-other"
                            in:scale={{ duration: 150, delay: 150 }}
                            out:scale={{ duration: 150 }}
                        >
                            <div class="warning-inner-with-icon">
                                <div><ClockIcon size="32" /></div>
                                <div>
                                    <Overlay
                                        id="signup-form-not-supported-msg"
                                        args={{
                                            learnCount: learning.length,
                                            lang1: learning[0]
                                                ? learning[0].label || ""
                                                : "",
                                            lang2: learning[1]
                                                ? learning[1].label || ""
                                                : "",
                                        }}
                                    >
                                        <p data-l10n-name="sorry" />
                                        <p data-l10n-name="no-worries" />
                                    </Overlay>
                                </div>
                            </div>
                        </div>
                    {/if}
                </fieldset>
            {/if}
            <fieldset class="my-4">
                <legend>
                    <Localized
                        id="signup-form-teaching-label"
                        args={{ max: MAX_TEACHING }}
                    />
                </legend>
                <p class="helper-text">
                    <Localized id="signup-form-teaching-helper" />
                </p>
                <div class="form-control">
                    <GroupSelect
                        items={teachable}
                        selected={teaching.length ? teaching : null}
                        hideInput={totalTeaching >= MAX_TEACHING}
                        on:select={handleSelectTeaching}
                        placeholder={$translate(
                            "signup-form-teaching-placeholder"
                        )}
                    />
                </div>
            </fieldset>
            <fieldset class="mb-4">
                <legend><Localized id="signup-form-gender-label" /></legend>
                <p class="helper-text">
                    <Localized id="signup-form-gender-helper" />
                </p>
                <div class="form-control">
                    <ButtonSmall
                        tag="button"
                        className="mr-1 mb-1"
                        variant={gender === Gender.FEMALE
                            ? "FILLED"
                            : "OUTLINED"}
                        on:click={() => toggleGender(Gender.FEMALE)}
                    >
                        <Localized
                            id="signup-form-gender-female"
                        /></ButtonSmall
                    >
                    <ButtonSmall
                        tag="button"
                        className="mr-1 mb-1"
                        variant={gender === Gender.MALE ? "FILLED" : "OUTLINED"}
                        on:click={() => toggleGender(Gender.MALE)}
                    >
                        <Localized id="signup-form-gender-male" /></ButtonSmall
                    >
                    <ButtonSmall
                        tag="button"
                        variant={gender === Gender.OTHER
                            ? "FILLED"
                            : "OUTLINED"}
                        on:click={() => toggleGender(Gender.OTHER)}
                    >
                        <Localized id="signup-form-gender-other" /></ButtonSmall
                    >
                </div>
            </fieldset>
            {#if errorMessage}
                <div class="mb-2">
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </div>
            {/if}
            <ButtonLarge
                tag="button"
                className="w-full justify-center"
                on:click={handleSubmit}
                disabled={submitting}
                ><Localized id="signup-form-submit" /><ArrowRightIcon
                    class="ml-2 self-center"
                    size="24"
                /></ButtonLarge
            >
        </form>
    </div>
{/if}

<style>
    .helper-text {
        @apply text-sm;
        @apply text-gray-bitdark;
        @apply my-0;
        @apply mb-1;
    }

    input {
        @apply px-4;
        @apply py-3;
        @apply mb-3;
        @apply my-1;
    }

    .level {
        @apply justify-between;
        @apply max-w-xs;
        @apply mb-2;
    }

    .level label {
        @apply font-normal !important;
        @apply text-base !important;
        @apply m-0 !important;
        @apply mr-2 !important;
    }

    .level select {
        @apply pr-8 !important;
    }

    .warning-skill {
        @apply px-6;
        @apply py-4;
        @apply my-1;
        @apply rounded-2xl;
        @apply bg-gray-lightest;
        @apply text-gray-dark;
    }

    .warning-learn-other {
        @apply px-6;
        @apply py-4;
        @apply my-1;
        @apply rounded-2xl;
        @apply bg-gray-lightest;
        @apply font-bold;
        @apply text-gray-dark;
    }

    .warning-skill p:last-child,
    .warning-learn-other p:last-child {
        @apply m-0;
    }

    .warning-inner-with-icon {
        @apply flex;
        @apply items-center;
        @apply space-x-6;
    }
</style>
