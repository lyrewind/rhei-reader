import { writable }from "svelte/store";

function createSettingStore<T>(option: string, initialValue: T) {
    const store = writable<T>(initialValue)
    const { subscribe, set } = store;

    const isBrowser = typeof window != "undefined";

    if (isBrowser && localStorage[option]) set(JSON.parse(localStorage[option]))

    return {
        subscribe,
        set(value: T) {

            if (!isBrowser) return;

            localStorage[option] = JSON.stringify(value);
            set(value);
        },
    };
}

export const progressOpacity = createSettingStore("progressOpacity", 25);
export const controlOpacity = createSettingStore("controlOpacity", 0);
export const serverAddress = createSettingStore("serverAddress", "http://127.0.0.1:3000")
