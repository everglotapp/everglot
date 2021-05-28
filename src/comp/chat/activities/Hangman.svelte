<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import ButtonSmall from "../../util/ButtonSmall.svelte"

    const dispatch = createEventDispatcher()

    const handleQuit = (_event: MouseEvent) => {
        dispatch("quit")
    }
</script>

<div class="flex flex-row m-4 max-h-12 px-2 justify-between items-center">
    <div class="text-lg py-1 px-3 bg-gray-lightest border-primary border-b-2">
        <Localized id="chat-side-panel-activity-hangman" />
    </div>
    <ButtonSmall
        tag="button"
        className="justify-center"
        color="PRIMARY"
        variant="TEXT"
        on:click={handleQuit}
        ><Localized id="chat-side-panel-activity-quit" /></ButtonSmall
    >
</div>
<div class="flex justify-center">
    <div class="inline-block relative">
        <div class="rope" />
        <div class="box-top" />
        <div class="box-left" />
        <div class="box-bottom" />
        <img src="/squirrel.png" alt="Squirrel" class="squirrel" />
    </div>
</div>

<style>
    .squirrel {
        position: absolute;
        max-width: 207px;
        bottom: 49px;
        left: 82px;
    }

    .rope {
        height: 190px;
        width: 3px;
        background: #664e27;
        margin-left: 8px;
        position: absolute;
        top: 23px;
        left: 193px;
    }

    .box-top {
        height: 23px;
        width: 236px;
        background: #b57a57;
        margin-left: 20px;
    }

    .box-left {
        height: 350px;
        width: 20px;
        background: #b57a57;
        margin-left: 20px;
    }

    .box-bottom {
        height: 66px;
        width: 381px;
        background: #b57a57;
        margin-left: 8px;
    }
</style>
