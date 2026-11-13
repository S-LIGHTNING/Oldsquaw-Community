export function URLWithParams(
    url: string,
    params: string[][] | Record<string, string> | string | URLSearchParams
): string {
    return url + "?" + new URLSearchParams(params)
}
