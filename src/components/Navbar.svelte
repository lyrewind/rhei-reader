<script lang="ts">
    import Settings from "./Settings.svelte";
    import type { VoidFunction } from "$lib/types";
    import { view, currentPath, items, page } from "../stores/library";
    import { toast } from "@zerodevx/svelte-toast";

    export let onSaveSettings: VoidFunction;

    let open = false;

    function openSettings() {
        open = true;
    }

    function closeSettings() {
        onSaveSettings();
        toast.push({
            msg: "Saving settings and reloading library...",
            duration: 3000,
        });
        open = false;
    }

    function jumpToParent() {
        page.set(0);
        currentPath.up();
        items.fetch();
    }
</script>

<div class="flex w-full justify-between">
    <div class="text-stone-100 flex-center ml-2">
        <h3>Rhei</h3>
        <p>reader</p>
    </div>

    <div class="flex">
        {#if $currentPath.length}
            <button class="pretty-button" on:click={jumpToParent}>Back</button>
        {/if}
        <button class="pretty-button" on:click={openSettings}>Settings</button>
    </div>
</div>

{#if open}
    <Settings onClose={closeSettings} />
{/if}

<style>
    h3 {
        font-size: 1.5rem;
        font-weight: bold;
        text-shadow: 0 0 4px snow;
    }
    p {
        padding-top: 0.2em;
        font-weight: 600;
        text-shadow: 2px 2px 1px grey;
    }
</style>
