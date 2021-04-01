<script lang="ts">
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
</script>

<svelte:head>
    <title>Global – Everglot</title>
</svelte:head>

<div class="container flex w-auto gap-x-4">
    <div
        class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center flex justify-center"
    >
        <ButtonLarge tag="button">German</ButtonLarge>
    </div>

    <div
        class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center flex justify-center"
    >
        <ButtonLarge tag="button">English</ButtonLarge>
    </div>

    <div
        class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center flex justify-center"
    >
        <ButtonLarge tag="button">Chinese</ButtonLarge>
    </div>
</div>
