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

<div class="container max-w-5xl py-16">
    <PageTitle>Everglot Demo</PageTitle>
    <div class="join-container rounded-md">
        <main class="join-main">
            <form name="join-chat" action="/chat">
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
        </main>
    </div>
</div>

<style>
    .join-container {
        max-width: 500px;
        margin: 80px auto;
    }

    .join-main {
        padding: 30px 40px;
        background: var(--dark-color-b);
    }

    .join-main p {
        margin-bottom: 20px;
    }

    .join-main .form-control {
        margin-bottom: 20px;
    }

    .join-main label {
        display: block;
        margin-bottom: 5px;
        @apply text-gray-light;
    }

    .join-main input[type="text"] {
        font-size: 16px;
        padding: 5px;
        height: 40px;
        width: 100%;
    }

    .join-main select {
        font-size: 16px;
        padding: 5px;
        height: 40px;
        width: 100%;
    }
</style>
