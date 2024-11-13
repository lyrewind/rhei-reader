<script lang="ts">
    import type { VoidFunction } from "$lib/types";


    export let onLeft: VoidFunction;
    export let onRight: VoidFunction;
</script>

<div class="grid grid-cols-2 w-full h-12 justify-between">
    <button on:click={onLeft}>Previous</button>
    <button on:click={onRight}>Next</button>
</div>

<style>
    button {
        @apply border border-rose-500;
    }
    button:hover {
        @apply border-rose-300;
    }
</style>
