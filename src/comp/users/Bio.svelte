<script lang="ts">
    import type { User } from "../../types/generated/graphql"
    export let uuid: User["uuid"] | null = null
</script>

<div>
    {uuid}
</div>
