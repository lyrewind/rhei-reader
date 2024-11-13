<script lang="ts">
    import InfiniteScroll from "svelte-infinite-scroll";

    import type { Nullable, VoidFunction } from "$lib/types";
    import Page from "../Page.svelte";
    import NavigationControls from "./NavigationControls.svelte";
    import Progress from "./Progress.svelte";
    import ZoomControl from "./ZoomControl.svelte";
    import { getBookmark, setBookmark, type Bookmark } from "$lib/bookmarking";
    import { currentPath } from "../../stores/library";
    import { toast } from "@zerodevx/svelte-toast";

    export let pages: Array<string>;
    export let onBack: VoidFunction;

    const pagesPerLoad = 10;
    const yPerScroll = 150;

    let loadedCount = 0;
    let loadedPages: Array<string> = [];
    let currentPage = 1;

    let waitingBookmark = false;
    let bookmark: Nullable<Bookmark> = null;
    let hasBookmark = false;

    let viewer: HTMLElement;

    $: loadedPages = [...pages.slice(0, loadedCount + pagesPerLoad)];

    $: hasBookmark = bookmark != null;

    function scrollY(direction: "up" | "down"): void {
        viewer.scrollBy({
            top: direction == "up" ? -yPerScroll : yPerScroll,
        });
    }

    function handleKeydown(e: KeyboardEvent): void {
        if (e.code == "Backspace") onBack();
        if (e.code == "KeyJ") scrollY("down");
        if (e.code == "KeyK") scrollY("up");
    }

    // load all pages until the marked one then scroll to it.
    function jumpToBookmark() {
        if (bookmark == null)
            return console.warn("can't jump to nonexistent bookmark, silly.");

        // only load more pages if the marked page isn't already visible
        if (loadedCount < bookmark.page) loadedCount = bookmark.page;

        let attempts = 0;
        // waits for up to 5 seconds for the page to load
        let handler = setInterval(() => {
            if (attempts >= 10 || bookmark == null)
                return clearInterval(handler);

            // grab the <picture/> item, then the <img/> inside it
            const pageContainerRef = <Nullable<HTMLImageElement>>(
                document.getElementById(`p-${bookmark.page}`)
            );
            const pageImageRef = <Nullable<HTMLImageElement>>(
                pageContainerRef?.firstChild
            );

            if (pageImageRef?.complete) {
                pageImageRef.scrollIntoView({
                    behavior: "smooth",
                });
                clearInterval(handler);
            } else attempts++;
        }, 500);
    }

    function setPageProgress(pageNumber: number): void {
        currentPage = pageNumber;
    }

    function addBookmark(pageNumber: number) {
        if (waitingBookmark) {
            waitingBookmark = false;
            bookmark = setBookmark(currentPath.toString(), pageNumber);
            toast.push({
                msg: `Pg.${pageNumber} set to bookmark.`,
            });
        }
    }

    function adjustViewport() {
        const currentPageRef = document.getElementById(`p-${currentPage}`);

        if (currentPageRef)
            setTimeout(() => currentPageRef.scrollIntoView(), 25);
        // javascript is my passion...
        else
            console.warn(
                "failed to adjust viewport, the target page doesn't exist."
            );
    }

    function getBookmarkForCurrent() {
        bookmark = getBookmark(currentPath.toString());
    }

    getBookmarkForCurrent();

    setTimeout(() => {
        currentPage = 1;
    }, 100);
</script>

<svelte:window on:keydown={handleKeydown} />

{#if pages.length == 0}
    <!-- should never render -->
    <div class="fullscreen flex-center flex-col">
        <strong class="text-[1.25rem]">Nothing here.</strong>
        <p class="text-sm italic">[Backspace] to return to Menu</p>
    </div>
{:else}
    <Progress {currentPage} totalPages={pages.length} />
    <NavigationControls
        bind:waitingBookmark
        bind:hasBookmark
        {onBack}
        onJumpToBookmark={jumpToBookmark}
    />
    <ZoomControl onZoomChange={adjustViewport} />
    <ul
        class="w-full max-h-full flex flex-col items-center overflow-y-scroll overflow-x-hidden"
        bind:this={viewer}
    >
        {#each loadedPages as page, i}
            <Page
                src={page}
                pageNumber={i + 1}
                onEnterViewport={setPageProgress}
                onSelect={addBookmark}
            />
        {/each}
        <InfiniteScroll
            on:loadMore={() => (loadedCount += pagesPerLoad)}
            threshold={100}
        />
    </ul>
{/if}
