<script lang="ts">
    import ButtonLarge from "../../comp/util/ButtonLarge.svelte"
</script>

<svelte:head>
    <title>Success – Everglot</title>
</svelte:head>

<div class="container max-w-md text-center px-4 md:px-0">
    <p class="mt-16 mb-12 text-primary text-5xl font-bold">Success!</p>

    <p class="mb-12 text-gray-dark text-xl">
        You have been added to the waiting list. We will send you an email when
        we have sorted you into a language group. In the meantime, you can
        explore the platform.
    </p>

    <div class="max-w-xs mx-auto mb-16 md:mb-12">
        <ButtonLarge
            type="submit"
            className="w-full justify-center"
            href="/global">Explore Global Channels</ButtonLarge
        >
    </div>
</div>
