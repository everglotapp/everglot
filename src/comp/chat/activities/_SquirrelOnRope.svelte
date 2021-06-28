<script lang="ts">
    export let confused: boolean = false
    export let verticalOffset: number = 0
    const MAX_MOVE_Y_PX = 90
    $: limitedVerticalOffset = Math.min(verticalOffset, MAX_MOVE_Y_PX)
    $: ropeHeight = Math.max(0, 175 - limitedVerticalOffset)
</script>

<div
    class="rope"
    style={`transition: height 400ms ease-in-out; height: ${ropeHeight}px;`}
/>
<div class="box-top" />
<div class="box-left" />
<div class="box-bottom px-8 py-5">
    <slot name="bottom-box" />
</div>
<div class="squirrel-container">
    <div
        class="relative"
        style={`transition: transform 400ms ease-in-out; transform: translateY(-${limitedVerticalOffset}px)`}
    >
        <img src="/squirrel.png" alt="Squirrel" />
        {#if confused}
            <div class="absolute font-bold" style="right: 64px; top: 36px;">
                x
            </div>
            <div
                class="absolute font-bold"
                style="right: 55px; top: 60px; width: 11px; border-bottom: 2px solid black;"
            />
            <div class="absolute font-bold" style="right: 49px; top: 36px;">
                x
            </div>
        {/if}
    </div>
</div>

<style>
    .squirrel-container {
        position: absolute;
        max-width: 170px;
        bottom: 48px;
        left: 107px;
    }

    .rope {
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
        height: 300px;
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
