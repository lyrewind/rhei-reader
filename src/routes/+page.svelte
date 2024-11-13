<script lang="ts">
    import "../global.css";
    import Library from "../components/Library.svelte";
    import Navbar from "../components/Navbar.svelte";
    import Reader from "../components/reader/Reader.svelte";
    import { view, items, currentPath, page } from "../stores/library";

    import { toast } from "@zerodevx/svelte-toast";
    import LibraryControl from "../components/LibraryControl.svelte";

    let loading = false;
    let error = false;

    async function loadLibrary() {
        loading = true;

        const success = await items.fetch();

        if (success) error = false;
        else {
            error = true;
            toast.push("Failed to load library.");
        }

        loading = false;
    }

    function makePages(): Array<string> {
        return $items.map((item) => `${currentPath.toString()}/${item.name}`);
    }

    async function openItem(itemName: string): Promise<void> {
        const item = $items.find((item) => item.name == itemName);

        if (!item)
            return console.warn(
                `failed to select item ${itemName}, it doesn't exist.`
            );

        if (item.isDir) {
            page.set(0);

            currentPath.push(item.name);
            if (item.hasChildDir) {
                await items.fetch();
                $view = "library";
            } else {
                await items.fetch(true);
                $view = "reader";
            }
        }
    }

    function returnToLibrary() {
        page.set(0);
        $view = "library";
        currentPath.clear();
        items.fetch();
    }

    function changePage(pagesToJump: number) {
        page.jumpBy(pagesToJump);
        loadLibrary();
    }

    loadLibrary();
</script>

<div class="fullscreen">
    {#if $view == "library"}
        <div class="grid grid-rows-content">
            <Navbar onSaveSettings={loadLibrary} />
            {#if loading}
                <p class="text-center">Loading...</p>
            {:else if error}
                <strong class="text-center">Failed to load library.</strong>
                <p class="text-center italic text-sm">
                    Is the server address configured? (See Settings)
                </p>
            {:else}
                <Library onItemSelection={openItem} />
                <LibraryControl
                    onLeft={() => changePage(-1)}
                    onRight={() => changePage(1)}
                />
            {/if}
        </div>
    {:else}
        <Reader pages={makePages()} onBack={returnToLibrary} />
    {/if}
</div>
