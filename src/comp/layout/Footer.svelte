<script lang="ts">
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
</script>

<footer
    class="container flex flex-col-reverse sm:flex-row sm:justify-between mx-auto py-4 md:py-8 px-8 text-gray-bitdark"
>
    <div
        class="flex self-center sm:space-x-8 sm:justify-start flex-col sm:flex-row"
    >
        <span>&copy; 2021 Everglot.</span>
    </div>
    <div
        class="flex self-center sm:space-x-8 sm:justify-end flex-col sm:flex-row"
    >
        <a href="https://everglot.com/privacy"
            ><Localized id="footer-privacy" /></a
        >
        <span class="cursor-not-allowed"><Localized id="footer-imprint" /></span
        >
    </div>
</footer>
