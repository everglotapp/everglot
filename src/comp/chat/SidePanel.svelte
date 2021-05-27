<script lang="ts">
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import { groupUuid } from "../../stores"
</script>

{#key $groupUuid}
    <div>
        <div class="flex flex-row bg-gray-light max-h-12 px-2 items-center">
            <div class="text-lg py-1 px-3 border-primary border-b-2">
                <Localized id="chat-panel-games" />
            </div>
            <div class="text-lg py-1 px-3 border-b-2">
                <Localized id="chat-panel-subtitles" />
            </div>
        </div>
    </div>
{/key}
