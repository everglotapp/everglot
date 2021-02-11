<script lang="ts">
    import { goto } from "@sapper/app"
    import PageTitle from "../comp/typography/PageTitle.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"

    function joinChat() {
        if (document.forms["join-chat"].reportValidity()) {
            goto("/chat")
        }
    }
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<div class="container max-w-md py-16">
    <PageTitle>Everglot Demo</PageTitle>
    <form
        name="join-chat"
        action="/chat"
        class="bg-primary-lightest py-8 px-16"
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
            />
        </div>
        <div class="form-control">
            <label for="room">Room</label>
            <select name="room" id="room">
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
            on:click={joinChat}>Join Chat</ButtonLarge
        >
    </form>
</div>

<style>
    .join-container {
        max-width: 500px;
        margin: 80px auto;
    }

    .form-control {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 5px;
    }

    input[type="text"] {
        @apply w-full;
        @apply px-4;
        @apply py-2;
        @apply rounded-md;
    }

    select {
        @apply w-full;
        @apply px-4;
        @apply py-2;
        @apply rounded-md;
    }
</style>
