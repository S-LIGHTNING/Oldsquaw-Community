/**
 *
 * @param {EventContext<unknown, string, Record<string, unknown>>} context
 * @returns {Promise<Response>}
 */
export async function onRequest(context) {
    try {

        const { request } = context
        const url = new URL(request.url)
        url.host = "ccn.hopex.top"

        // 构建新请求
        const newHeaders = new Headers(request.headers)
        newHeaders.set("Origin", "https://ccn.hopex.top")
        newHeaders.set("Referer", "https://ccn.hopex.top/")
        newHeaders.delete("host")
        newHeaders.delete("accept-encoding")

        const response = await fetch(url, {
            method: request.method,
            headers: newHeaders,
            body: request.body
        })
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
    } catch (error) {
        const errorMessage = error instanceof Error ? error.stack ?? error.message : JSON.stringify(error)
        return new Response("An error occurred while processing the request:\n" + errorMessage, { status: 500 })
    }
}
