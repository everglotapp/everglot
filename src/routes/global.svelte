<script lang="ts">
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"

    import { query } from "@urql/svelte"

    import { allGroups } from "../stores"

    query(allGroups)

    $: groups =
        allGroups && !$allGroups.fetching && !$allGroups.error
            ? ["en", "de", "zh"].reduce(
                  (map, lang) => ({
                      ...map,
                      [lang]: $allGroups.data?.groups?.nodes
                          .filter(
                              (group) =>
                                  group &&
                                  group.global === true &&
                                  group.language?.alpha2 === lang
                          )
                          .map((group) => group!),
                  }),
                  {}
              )
            : { en: [], de: [], zh: [] }
</script>

<div class="container flex w-auto gap-x-4">
    <div
        class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
    >
        <h3 class="text-xl text-gray-bitdark">German</h3>
        {#each groups["de"] as group (group.uuid)}
            <div
                class="max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
            >
                <ButtonLarge href={`/chat?lang=German&group=${group.uuid}`}
                    >{group.groupName}</ButtonLarge
                >
            </div>
        {/each}
    </div>

    <div
        class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
    >
        <h3 class="text-xl text-gray-bitdark">English</h3>
        {#each groups["en"] as group (group.uuid)}
            <div
                class="max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
            >
                <ButtonLarge href={`/chat?lang=German&group=${group.uuid}`}
                    >{group.groupName}</ButtonLarge
                >
            </div>
        {/each}
    </div>

    <div
        class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
    >
        <h3 class="text-xl text-gray-bitdark">Chinese</h3>
        {#each groups["zh"] as group (group.uuid)}
            <div
                class="max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
            >
                <ButtonLarge href={`/chat?lang=German&group=${group.uuid}`}
                    >{group.groupName}</ButtonLarge
                >
            </div>
        {/each}
    </div>
</div>
