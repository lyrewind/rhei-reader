<script lang="ts">
    export let id: string;
    export let value: string;
    export let label: string;
</script>

<div class="flex flex-col">
    <label for={id}>{label}</label>
    <input class="px-2 py-1 leading-none text-stone-900" {id} bind:value/>
</div>
