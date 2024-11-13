import { fetchLibrary, type LibraryItem } from "$lib/api";
import { get, writable } from "svelte/store";
import { serverAddress } from "./settings";
import { PAGE_SIZE } from "$lib/constants";

type View = "library" | "reader";

export const view = writable<View>("library");
/**
 * The path currently opened in the library.
 */
export const currentPath = (() => {
    const currentPath = writable<Array<string>>([]);
    const { subscribe, set } = currentPath;

    return {
        subscribe,
        set,
        clear() {
            set([]);
        },
        push(item: string) {
            currentPath.update(curr => [...curr, item]);
        },
        up() {
            currentPath.update(curr => [...curr.slice(0, -1)]);
        },
        toString() {
            return get(currentPath).join("/");
        },
        isEmpty() {
            return get(currentPath).length == 0;
        },
    };
})();

/**
 * The items currently being displayed in the library.
 */
export const items = (() => {
    const items = writable<Array<LibraryItem>>([]);
    const { subscribe, set } = items;

    return {
        subscribe,
        set,
        async fetch(all?: boolean): Promise<boolean> {
            const path = currentPath.isEmpty()
                ? undefined
                : currentPath.toString();
            const data = await fetchLibrary(
                {
                    address: get(serverAddress),
                    page: get(page),
                    pageSize: PAGE_SIZE,
                    all,
                },
                path
            );

            if (data == null) return false;
            else {
                items.set(data.items);
                return true;
            }
        },
    };
})();

/**
 * The current page number.
 */
export const page = (() => {
    const page = writable(0);
    const { subscribe, set } = page;

    return {
        subscribe,
        set(to: number) {
            if (to >= 0) set(to);
        },
        jumpBy(pages: number) {
            page.update(curr => (curr + pages >= 0 ? (curr += pages) : curr));
        },
    };
})();

export const zoomLevel = (() => {
    const zoomLevel = writable(1);
    const { subscribe, set } = zoomLevel;

    return {
        subscribe,
        set,
        zoom(modifier: number) {
            zoomLevel.update(curr => (curr += modifier));
        },
    };
})();
