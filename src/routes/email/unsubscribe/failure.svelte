<script lang="ts">
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import ErrorMessage from "../../../components/util/ErrorMessage.svelte"
</script>

<div class="container py-8 md:py-16 max-w-xl text-center">
    <ErrorMessage
        ><p><Localized id="email-unsubscribe-failure-link-invalid" /></p>
        <p class="mb-0">
            <Localized id="email-unsubscribe-failure-contact-us" />
        </p></ErrorMessage
    >
</div>
