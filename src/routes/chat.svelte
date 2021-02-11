<script lang="ts">
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<div class="container max-w-5xl py-8">
    <div class="chat-container">
        <header class="chat-header">
            <h1><i class="fas fa-smile" />Everglot Demo</h1>
            <a href="/" class="btn">Leave Room</a>
        </header>
        <main class="chat-main">
            <div class="chat-sidebar">
                <h3><i class="fas fa-comments" /> Room Name:</h3>
                <h2 id="room-name" />
                <h3><i class="fas fa-users" /> Users</h3>
                <ul id="users" />
            </div>
            <div class="chat-messages" />
        </main>
        <div class="chat-form-container">
            <form id="chat-form">
                <input
                    id="msg"
                    type="text"
                    placeholder="Enter Message"
                    required
                    autocomplete="off"
                />
                <button class="btn"
                    ><i class="fas fa-paper-plane" /> Send</button
                >
            </form>
        </div>
    </div>
</div>

<style>
    .chat-container {
        max-width: 1100px;
        background: #fff;
        margin: 30px auto;
        overflow: hidden;
    }

    .chat-header {
        background: var(--dark-color-a);
        color: #fff;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        padding: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .chat-main {
        display: grid;
        grid-template-columns: 1fr 3fr;
    }

    .chat-sidebar {
        background: var(--dark-color-b);
        color: #fff;
        padding: 20px 20px 60px;
        overflow-y: scroll;
    }

    .chat-sidebar h2 {
        font-size: 20px;
        background: rgba(0, 0, 0, 0.1);
        padding: 10px;
        margin-bottom: 20px;
    }

    .chat-sidebar h3 {
        margin-bottom: 15px;
    }

    .chat-sidebar ul li {
        padding: 10px 0;
    }

    .chat-messages {
        padding: 30px;
        max-height: 500px;
        overflow-y: scroll;
    }

    .chat-messages .message {
        padding: 10px;
        margin-bottom: 15px;
        background-color: var(--light-color);
        border-radius: 5px;
        overflow-wrap: break-word;
    }

    .chat-messages .message .meta {
        font-size: 15px;
        font-weight: bold;
        color: var(--dark-color-b);
        opacity: 0.7;
        margin-bottom: 7px;
    }

    .chat-messages .message .meta span {
        color: #777;
    }

    .chat-form-container {
        padding: 20px 30px;
        background-color: var(--dark-color-a);
    }

    .chat-form-container form {
        display: flex;
    }

    .chat-form-container input[type="text"] {
        font-size: 16px;
        padding: 5px;
        height: 40px;
        flex: 1;
    }

    @media (max-width: 700px) {
        .chat-main {
            display: block;
        }

        .chat-sidebar {
            display: none;
        }
    }
</style>
