<script lang="ts">
    export let size: number = 32
    export let stroke: number = 4
</script>

<div
    class="spinner"
    style={`width: ${size}px; height: ${size}px; border-width: ${stroke}px;`}
/>

<style>
    .spinner:not(:required) {
        -moz-animation: everglot-spinner 1250ms infinite linear;
        -webkit-animation: everglot-spinner 1250ms infinite linear;
        animation: everglot-spinner 1250ms infinite linear;
        border-style: solid;
        border-color: theme("colors.primary.DEFAULT");
        border-right-color: transparent;
        border-radius: 50%;
        box-sizing: border-box;
        display: inline-block;
        position: relative;
        overflow: hidden;
        text-indent: -9999px;
    }

    @-moz-keyframes everglot-spinner {
        0% {
            -moz-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -moz-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @-webkit-keyframes everglot-spinner {
        0% {
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
    @keyframes everglot-spinner {
        0% {
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
        }

        100% {
            -moz-transform: rotate(360deg);
            -ms-transform: rotate(360deg);
            -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
        }
    }
</style>
