<script lang="ts">
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import ButtonLarge from "../../comp/util/ButtonLarge.svelte"
</script>

<svelte:head>
    <Localized id="signup-success-head" let:attrs>
        <title>{attrs.title}</title>
    </Localized>
</svelte:head>

<div class="container max-w-md text-center px-4 md:px-0">
    <p class="mt-16 mb-12 text-primary text-5xl font-bold">
        <Localized id="signup-success-title" />
    </p>

    <p class="mb-12 text-gray-dark text-xl">
        <Localized id="signup-success-msg" />
    </p>

    <div class="max-w-xs mx-auto mb-16 md:mb-12">
        <ButtonLarge
            type="submit"
            className="w-full justify-center"
            href="/global"
            ><Localized id="signup-success-explore" />
        </ButtonLarge>
    </div>
</div>
