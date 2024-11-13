import type { Nullable } from "./types";

const BOOKMARKS_KEY = "bookmarks";

function isBrowser() {
    return typeof window != "undefined";
}

export type Bookmark = {
    item: string;
    page: number;
};

type Bookmarks = {
    [key: string]: number;
};

export function getBookmark(item: string): Nullable<Bookmark> {
    if (!isBrowser()) return null;

    const bookmarks: Bookmarks = localStorage[BOOKMARKS_KEY]
        ? JSON.parse(localStorage[BOOKMARKS_KEY])
        : {};
    const page = bookmarks[item];

    return page ? { item, page } : null;
}

export function setBookmark(item: string, page: number): Nullable<Bookmark> {
    if (!isBrowser()) return null;

    const bookmarks: Bookmarks = localStorage[BOOKMARKS_KEY]
        ? JSON.parse(localStorage[BOOKMARKS_KEY])
        : {};
    bookmarks[item] = page;

    localStorage[BOOKMARKS_KEY] = JSON.stringify(bookmarks);

    return { item, page };
}
