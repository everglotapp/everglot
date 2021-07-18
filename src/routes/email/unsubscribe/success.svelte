<script lang="ts">
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import Headline1 from "../../../comp/typography/Headline1.svelte"
</script>

<div class="container py-8 md:py-16 max-w-xl text-center">
    <Headline1><Localized id="email-unsubscribe-success-headline" /></Headline1>
    <p class="text-xl font-bold font-secondary text-gray-bitdark">
        <Localized id="email-unsubscribe-success-description" />
    </p>
</div>
