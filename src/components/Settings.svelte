<script lang="ts">
    import { controlOpacity, progressOpacity, serverAddress } from "../stores/settings";
    import type { VoidFunction } from "$lib/types";
    import Range from "./generic/Range.svelte";
    import TextInput from "./generic/TextInput.svelte";

    export let onClose: VoidFunction;

    let controlLabel: string;
    let progressLabel: string;

    function getOpacityLabelFor(value: number) {
        return value == 100 ? "Opaque" : value == 0 ? "Transparent" : `${value}%`;
    }

    $: controlLabel = getOpacityLabelFor($controlOpacity);
    $: progressLabel = getOpacityLabelFor($progressOpacity);

</script>

<div class="absolute fullscreen flex-center bg-black/70">
    <div
        class="w-[40dvw] h-[60dvh] grid grid-rows-settings bg-black border border-slate-900"
    >
        <strong class="text-right pt-4 pr-6">Settings</strong>

        <div class="px-6">
            <div class="mt-4 flex flex-col">
                <div>
                    <TextInput
                        id="serverAdress"
                        bind:value={$serverAddress}
                        label="Server Address"
                    />
                    <p class="text-sm italic leading-6 opacity-90">
                        The IP address of a server running Rhei.
                    </p>
                </div>
            </div>

            <div class="mt-4 flex flex-col">
                <div>
                    <Range
                        id="control-opacity"
                        label={`Progress Opacity - ${progressLabel}`}
                        bind:value={$progressOpacity}
                        min={0}
                        max={100}
                        step={5}
                    />
                    <p class="text-sm italic leading-2 opacity-90">
                        Sets the opacity for the reader's progress display, defaults to 25%.
                    </p>
                </div>
            </div>

            <div class="mt-4 flex flex-col">
                <div>
                    <Range
                        id="control-opacity"
                        label={`Control Opacity- ${controlLabel}`}
                        bind:value={$controlOpacity}
                        min={0}
                        max={100}
                        step={5}
                    />
                    <p class="text-sm italic leading-2 opacity-90">
                        Sets the opacity for the reader's navigation and zoom
                        controls, defaults to transparent.
                    </p>
                </div>
            </div>
        </div>

        <button class="pretty-button" on:click={onClose}>Close</button>
    </div>
</div>
