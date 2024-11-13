<script lang="ts">
    import { SvelteToast } from "@zerodevx/svelte-toast";
</script>

<SvelteToast
    options={{
        duration: 4000,
    }}
/>
<slot />

<style lang="postcss">
    :root {
        --toastContainerTop: auto;
        --toastContainerBottom: 1.25rem;

        --toastBackground: theme(colors.rose.600);
        --toastColor: theme(colors.rose.100);
        --toastBarBackground: theme(colors.rose.300);
    }
</style>
