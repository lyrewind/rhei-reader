<script lang="ts">
    import { items } from "../stores/library";

    export let onItemSelection: (itemName: string) => void;

    function handleSelection(itemName: string): void {
        onItemSelection(itemName);
    }

    function handleEntryKeypress(e: KeyboardEvent, itemName: string) {
        if (e.code == "Enter") handleSelection(itemName);
    }
</script>

<div class="flex flex-col justify-center">
    {#if $items.length > 0}
        {#each $items as item}
            {#if item.isDir && (item.hasChildDir || item.hasChildFile)}
                <ul>
                    <li
                        class="flex px-2 py-4 border border-rose-500 hover:border-rose-300 hover:cursor-pointer hover:border-l-8 duration-300"
                        on:click={() => handleSelection(item.name)}
                        on:keypress={(e) => handleEntryKeypress(e, item.name)}
                    >
                        <strong class="text-stone-100">{item.name}</strong>
                    </li>
                </ul>
            {/if}
        {/each}
    {:else}
        <p class="py-6 italic text-center text-lg">This page is empty.</p>
    {/if}
</div>
