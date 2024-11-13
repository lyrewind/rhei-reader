<script lang="ts">
    export let label: string;
    export let value: number;
    export let min: number;
    export let max: number;
    export let step: number;
    export let id: string;
</script>

<div class="flex flex-col">
    <label for={id}>{label}</label>
    <input class="accent-rose-300" {id} type="range" bind:value {min} {max} {step}>
</div>
