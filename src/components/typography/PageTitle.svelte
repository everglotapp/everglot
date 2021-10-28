<script lang="ts">
    export let className: string = "";
</script>

<h1 class={`font-bold text-xl text-gray-dark mb-3 ${className}`}>
    <slot/>
</h1>
<hr class="mb-4 border-gray-bitlight" />
