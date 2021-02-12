<script lang="ts">
    import { goto } from "@sapper/app"
    import { username, room } from "../stores"

    import ButtonLarge from "../comp/util/ButtonLarge.svelte"

    import { LogInIcon } from "svelte-feather-icons"

    function joinChat() {
        if (document.forms["join-chat"].reportValidity()) {
            goto("/chat")
        }
    }
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<div class="container max-w-md py-24">
    <form
        name="join-chat"
        action="/chat"
        class="bg-primary-lightest py-10 px-16"
        on:submit|preventDefault={joinChat}
    >
        <div class="form-control">
            <label for="username">Username</label>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username..."
                required
                bind:value={$username}
                class="px-4 py-3 border-none shadow-md"
            />
        </div>
        <div class="form-control">
            <label for="room">Room</label>
            <select
                name="room"
                id="room"
                bind:value={$room}
                class="border-none shadow-sm"
            >
                <option value="English">English</option>
                <option value="German">German</option>
                <option value="French">French</option>
                <option value="Italian">Italian</option>
                <option value="Spanish">Spanish</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
            </select>
        </div>
        <ButtonLarge
            tag="button"
            className="w-full justify-center"
            on:click={joinChat}
            >Join Chat<LogInIcon size="20" class="ml-2" /></ButtonLarge
        >
    </form>
</div>

<style>
    .form-control {
        margin-bottom: 20px;
    }

    label {
        display: block;
        @apply mb-2;
        @apply text-gray-bitdark;
        @apply font-bold;
    }

    input[type="text"] {
        @apply w-full;
        @apply rounded-md;
    }

    select {
        @apply w-full;
        @apply px-4;
        @apply py-2;
        @apply rounded-md;
    }
</style>
