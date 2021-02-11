<script lang="ts">
    export let segment: string | undefined
</script>

<nav class="flex container mx-auto px-2">
    <ul class="flex flex-1">
        <li class="mr-2">
            <a
                aria-current={segment === undefined ? "page" : undefined}
                class="logo font-bold uppercase tracking-wide"
                href=".">Everglot</a
            >
        </li>
    </ul>
</nav>

<style>
    li a[aria-current] {
        position: relative;
        display: inline-block;
    }

    li a[aria-current]::after {
        position: absolute;
        content: "";
        height: 2px;
        display: block;
        bottom: 0;
        left: 0;
        right: 0;
        @apply bg-accent;
    }

    li a[aria-current].logo::after {
        background-color: transparent;
    }

    a {
        display: flex;
        padding: 1rem 1rem;
        text-decoration: none;
        @apply text-gray-bitdark;
    }

    a.logo {
        @apply text-black;
    }

    li:hover a {
        @apply bg-gray-verylight;
    }
</style>
