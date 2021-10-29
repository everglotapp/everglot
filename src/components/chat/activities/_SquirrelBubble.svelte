<div class="wrapper">
    <div
        class="bubble bg-primary-lightest p-4 max-w-sm font-bold text-lg text-gray-bitdark"
    >
        <slot />
    </div>
    <img
        src="/squirrel.png"
        alt="Squirrel"
        class="squirrel absolute right-4 bottom-4"
    />
</div>

<style>
    .wrapper {
        @apply relative;
        @apply flex;
        @apply justify-end;
        @apply pb-48;

        @screen md {
            padding-bottom: calc(min(180px, 30vh));
        }
    }

    .bubble {
        position: relative;
        border-radius: 1.5rem;

        @screen md {
            @apply mr-48;
        }
    }

    .bubble::after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border: 2.5rem solid transparent;
        border-top: 0;
        border-right-color: theme("colors.primary.lightest");
        border-left: 0;
        right: 150px;
        margin-right: -1.5rem;
        margin-top: -0.75rem;
        bottom: -1.5rem;

        @screen md {
            border-left: 2.5rem solid theme("colors.primary.lightest");
            border-right: 0;
            border-bottom: 0;
            border-top: 2.5rem solid transparent;
            right: 4px;
            bottom: -7px;
            transform: rotate(20deg);
        }
    }

    .squirrel {
        transform: rotateY(180deg);
        max-width: 154px;
        right: 9px;
    }
</style>
