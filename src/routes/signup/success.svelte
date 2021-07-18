<script lang="ts">
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../../comp/layout/BrowserTitle.svelte"
    import Headline1 from "../../comp/typography/Headline1.svelte"
    import ButtonLarge from "../../comp/util/ButtonLarge.svelte"
    import {
        ANDROID_WEBVIEW_USER_AGENT,
        IOS_WEBVIEW_USER_AGENT,
    } from "../../constants"
</script>

<Localized id="signup-success-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<div class="container max-w-md text-center px-4 md:px-0">
    <Headline1>
        <Localized id="signup-success-title" />
    </Headline1>

    <p class="mb-12 text-gray-dark text-xl">
        <Localized id="signup-success-msg" />
    </p>

    {#if false}
        <div class="max-w-xs mx-auto mb-4 md:mb-4">
            <ButtonLarge
                type="submit"
                className="w-full justify-center"
                href="/global"
                ><Localized id="signup-success-explore" />
            </ButtonLarge>
        </div>
    {/if}

    {#if typeof navigator !== "undefined" && navigator && navigator.userAgent && ![IOS_WEBVIEW_USER_AGENT, ANDROID_WEBVIEW_USER_AGENT].includes(navigator.userAgent)}
        <div class="max-w-sm mx-auto mb-1">
            <ButtonLarge
                variant="TEXT"
                color="SECONDARY"
                className="w-full justify-center"
                href="https://testflight.apple.com/join/ZvjofjHo"
                target="_blank"
                ><svg
                    fill="#000000"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    width="32"
                    height="32"
                    class="mr-2"
                >
                    <path
                        d="M25.565,9.785c-0.123,0.077-3.051,1.702-3.051,5.305c0.138,4.109,3.695,5.55,3.756,5.55 c-0.061,0.077-0.537,1.963-1.947,3.94C23.204,26.283,21.962,28,20.076,28c-1.794,0-2.438-1.135-4.508-1.135 c-2.223,0-2.852,1.135-4.554,1.135c-1.886,0-3.22-1.809-4.4-3.496c-1.533-2.208-2.836-5.673-2.882-9 c-0.031-1.763,0.307-3.496,1.165-4.968c1.211-2.055,3.373-3.45,5.734-3.496c1.809-0.061,3.419,1.242,4.523,1.242 c1.058,0,3.036-1.242,5.274-1.242C21.394,7.041,23.97,7.332,25.565,9.785z M15.001,6.688c-0.322-1.61,0.567-3.22,1.395-4.247 c1.058-1.242,2.729-2.085,4.17-2.085c0.092,1.61-0.491,3.189-1.533,4.339C18.098,5.937,16.488,6.872,15.001,6.688z"
                    /></svg
                ><span><Localized id="signup-success-download-app-ios" /></span
                ></ButtonLarge
            >
        </div>
        <div class="max-w-sm mx-auto">
            <ButtonLarge
                variant="TEXT"
                color="SECONDARY"
                className="w-full justify-center"
                href="https://play.google.com/store/apps/details?id=com.everglot"
                target="_blank"
            >
                <svg
                    width="32"
                    height="32"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="-147 -70 294 345"
                    class="mr-2"
                >
                    <g fill="#a4c639">
                        <use
                            stroke-width="14.4"
                            xlink:href="#b"
                            stroke="#FFF"
                        />
                        <use xlink:href="#a" transform="scale(-1,1)" />
                        <g id="a" stroke="#FFF" stroke-width="7.2">
                            <rect
                                rx="6.5"
                                transform="rotate(29)"
                                height="86"
                                width="13"
                                y="-86"
                                x="14"
                            />
                            <rect
                                id="c"
                                rx="24"
                                height="133"
                                width="48"
                                y="41"
                                x="-143"
                            />
                            <use y="97" x="85" xlink:href="#c" />
                        </g>
                        <g id="b">
                            <ellipse cy="41" rx="91" ry="84" />
                            <rect
                                rx="22"
                                height="182"
                                width="182"
                                y="20"
                                x="-91"
                            />
                        </g>
                    </g>
                    <g stroke="#FFF" stroke-width="7.2" fill="#FFF">
                        <path d="m-95 44.5h190" /><circle
                            cx="-42"
                            r="4"
                        /><circle cx="42" r="4" />
                    </g>
                </svg><span
                    ><Localized
                        id="signup-success-download-app-android"
                    /></span
                ></ButtonLarge
            >
        </div>
    {/if}
</div>
