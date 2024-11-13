<script lang="ts">
    import { progressOpacity } from "../../stores/settings";

    export let currentPage: number;
    export let totalPages: number;

    let opacity = 1;

    function hide() {
        opacity = $progressOpacity * 0.01;
    }
    function show() {
        opacity = 1;
    }

    setTimeout(hide, 1500);
</script>

<div
    class="absolute px-6 py-3"
    style:opacity={opacity}
    on:mouseover={show}
    on:focus={show}
    on:mouseout={hide}
    on:blur={hide}
>
    <p class="px-4 py-2 bg-rose-800 text-rose-50">
        {currentPage} / {totalPages}
    </p>
</div>

