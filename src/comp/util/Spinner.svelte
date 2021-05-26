<div class="spinner" />

<style>
    .spinner:not(:required) {
        -moz-animation: everglot-spinner 1250ms infinite linear;
        -webkit-animation: everglot-spinner 1250ms infinite linear;
        animation: everglot-spinner 1250ms infinite linear;
        border: 6px solid theme("colors.primary.DEFAULT");
        border-right-color: transparent;
        border-radius: 16px;
        box-sizing: border-box;
        display: inline-block;
        position: relative;
        overflow: hidden;
        text-indent: -9999px;
        width: 32px;
        height: 32px;
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
