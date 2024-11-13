import Axios from "axios";
import type { NullablePromise } from "./types";

export type LibraryItem = {
    name: string;
    isDir: boolean;
    hasChildDir: boolean;
    hasChildFile: boolean;
};

export type FetchResponse = {
    items: Array<LibraryItem>;
};

const STATIC_ROUTE = "files";

type FetchOptions = {
    address: string,
    page: number;
    pageSize: number;
    all?: boolean;
};

export async function fetchLibrary(
    options: FetchOptions,
    path?: string
): NullablePromise<FetchResponse> {
    const { address, page, pageSize, all } = options;
    const route = path ? "/library/at" : "/library";
    const params = path
        ? {
            page,
            page_size: pageSize,
            path,
            all: !!all
        }
        : {
            page,
            page_size: pageSize,
            all: !!all
        };
    try {
        const response = await Axios.get<FetchResponse>(address + route, {
            params,
        });

        if (!response || !response.data) return null;
        else return response.data;
    } catch (error) {
        return null;
    }
}

export function makeStaticResource(serverAddress: string, path: string) {
    return `${serverAddress}/${STATIC_ROUTE}/${path}`;
}
