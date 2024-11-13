<script lang="ts">
    import { controlOpacity } from "../../stores/settings";

    export let waitingBookmark: boolean;
    export let hasBookmark: boolean;

    export let onBack: () => void;
    export let onJumpToBookmark: () => void;

    let opacity = 1;

    function show() {
        opacity = 1;
    }

    function hide() {
        opacity = $controlOpacity * 0.01;
    }

    function handleBookmarking() {
        waitingBookmark = !waitingBookmark;
    }

    setTimeout(hide, 1500);
</script>

<div
    class="flex absolute right-0 px-6 py-3"
    style:opacity={waitingBookmark ? 1 : opacity}
    on:mouseover={show}
    on:focus={show}
    on:mouseout={hide}
    on:blur={hide}
>
    {#if hasBookmark}
        <button class="pretty-button" on:click={onJumpToBookmark}
            >Jump to Bookmark</button
        >
    {/if}
    <button class="pretty-button" on:click={handleBookmarking}
        >{waitingBookmark ? "Cancel" : "Bookmark"}</button
    >
    <button class="pretty-button" on:click={onBack}>Back</button>
</div>
