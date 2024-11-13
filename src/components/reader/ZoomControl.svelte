<script lang="ts">
    import { Icon, PlusSmall, MinusSmall } from "svelte-hero-icons";
    import { zoomLevel } from "../../stores/library";
    import { controlOpacity } from "../../stores/settings";

    export let onZoomChange: () => void

    const STEP = 0.05;

    let opacity: number;

    function handleZoomChange(zoom: "in" | "out") {
        zoomLevel.zoom(zoom == "in" ? STEP : -STEP);
        onZoomChange()
    }

    function hide() {
        opacity = $controlOpacity * 0.01;
    }
    function show() {
        opacity = 1;
    }

    setTimeout(hide, 1500);
</script>

<div
    class="absolute h-min w-min m-1 flex bottom-0 left-0 rounded border border-rose-600"
    style:opacity
    on:mouseover={show}
    on:focus={show}
    on:mouseout={hide}
    on:blur={hide}
>
    <button
        class="zoom-button rounded-l"
        on:click={() => handleZoomChange("in")}><Icon src={PlusSmall} /></button
    >
    <button
        class="zoom-button rounded-r"
        on:click={() => handleZoomChange("out")}
        ><Icon src={MinusSmall} /></button
    >
</div>
