<script lang="ts">
    import IntersectionObserver from "svelte-intersection-observer";
    import { makeStaticResource } from "$lib/api";
    import { serverAddress } from "../stores/settings";
    import { zoomLevel } from "../stores/library";

    export let src: string;
    export let pageNumber: number;
    export let onEnterViewport: (pageNumber: number) => void;
    export let onSelect: (pageNumber: number) => void;

    let element: HTMLElement;
    let image: HTMLImageElement;
    let initialWidth: number;
    let initialHeight: number;
    let intersecting: boolean;

    function handleSelection() {
        onSelect(pageNumber);
    }

    function applyCurrentZoom() {
        let attempts = 0;
        const handler = setInterval(() => {
            if (attempts > 20) clearInterval(handler);

            if (image?.complete) {
                if (!initialWidth) initialWidth = image.width;
                if (!initialHeight) initialHeight = image.height;

                image.height *= $zoomLevel;
                image.width *= $zoomLevel;
                clearInterval(handler);
            }
        }, 100);
    }

    $: src = makeStaticResource($serverAddress, src);
    $: {
        if (image?.complete) image.width = initialWidth * $zoomLevel;
    }
    $: {
        if (image?.complete) image.height = initialHeight * $zoomLevel;
    }

    applyCurrentZoom();
</script>

<IntersectionObserver
    {element}
    bind:intersecting
    on:intersect={() => onEnterViewport(pageNumber)}
    threshold={0.3}
>
    <picture
        id={`p-${pageNumber}`}
        class="hover:outline hover:outline-sky-600"
        bind:this={element}
        on:click={handleSelection}
        on:keydown={(e) => e.key == "Return" && handleSelection()}
    >
        <img {src} bind:this={image} alt="An entry page." />
    </picture>
</IntersectionObserver>
