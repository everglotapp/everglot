<script lang="ts">
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
</script>

<div class="container flex w-auto gap-x-4">
    <div
        class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center flex justify-center shadow-sm"
    >
        <ButtonLarge href="/global/de">German</ButtonLarge>
    </div>

    <div
        class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center flex justify-center shadow-sm"
    >
        <ButtonLarge href="/global/en">English</ButtonLarge>
    </div>

    <div
        class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center flex justify-center shadow-sm"
    >
        <ButtonLarge href="/global/zh">Chinese</ButtonLarge>
    </div>
</div>
