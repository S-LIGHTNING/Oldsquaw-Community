/**
 *
 * @param {EventContext<unknown, string, Record<string, unknown>>} context
 * @returns {Promise<Response>}
 */
export async function onRequest(context) {

    const { request } = context
    const url = new URL(request.url)
    url.host = "ccn.hopex.top"

    const response = await fetch(url, request)
    const newResponse = new Response(response.body, response)

    const { headers: responseHeaders } = newResponse

    // 移除 Content-Encoding，因为原有响应编码已经不适用于新的响应
    responseHeaders.delete("content-encoding")

    // 修改 Cookie
    /** @type {string[]} */
    const setCookies = /** @type {any} */(responseHeaders).getSetCookie()
    responseHeaders.delete("set-cookie")
    for (const setCookie of setCookies) {
        const modifiedCookie = setCookie.replace(/ccn\.hopex\.top/g, (request.headers.get("host") ?? ""))
        responseHeaders.append("set-cookie", modifiedCookie)
    }

    return newResponse
}
