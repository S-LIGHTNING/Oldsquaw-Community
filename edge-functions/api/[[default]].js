const ALLOWED_ORIGIN_DOMAINS = [
    "next.ccwidget.top",
    "coco.ccwidget.top",
    "coco-next.localhost",
    "oc.slightning.site",
    "oldsquaw-community.localhost"
]

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

        const { headers: requestHeaders } = request

        const origin = new URL(requestHeaders.get("Origin") ?? requestHeaders.get("Referer") ?? "", "https://next.ccwidget.top")

        // 来源域名检查
        if (!ALLOWED_ORIGIN_DOMAINS.includes(origin.hostname)) {
            return new Response(`Origin ${origin.hostname} not allowed.\n\nAllowed Origin:\n${ALLOWED_ORIGIN_DOMAINS.join("\n")}\n`, { status: 403 })
        }

        // 构建新请求
        const newHeaders = new Headers(requestHeaders)
        newHeaders.set("Origin", "https://ccn.hopex.top")
        newHeaders.set("Referer", "https://ccn.hopex.top/")
        newHeaders.delete("Host")
        newHeaders.delete("Accept-Encoding")

        const response = await fetch(url, {
            method: request.method,
            headers: newHeaders,
            body: request.body
        })
        const newResponse = new Response(response.body, response)

        const { headers: responseHeaders } = newResponse

        // 移除 Content-Encoding，因为原有响应编码已经不适用于新的响应
        responseHeaders.delete("Content-Encoding")

        // 修改 Cookie
        /** @type {string[]} */
        const setCookies = /** @type {any} */(responseHeaders).getSetCookie()
        responseHeaders.delete("Set-Cookie")
        for (const setCookie of setCookies) {
            const modifiedCookie = setCookie.replace(/ccn\.hopex\.top/g, (request.headers.get("Host") ?? ""))
            responseHeaders.append("Set-Cookie", modifiedCookie)
        }

        // 允许跨域请求
        responseHeaders.set("Access-Control-Allow-Origin", origin.origin)

        return newResponse
    } catch (error) {
        const errorMessage = error instanceof Error ? error.stack ?? error.message : JSON.stringify(error)
        return new Response("An error occurred while processing the request:\n" + errorMessage, { status: 500 })
    }
}
