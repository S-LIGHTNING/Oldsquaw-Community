import axios from "axios"

const uploadedMap = new WeakMap<File, string>()

export async function uploadFile(file: File): Promise<string> {
    const cache = uploadedMap.get(file)
    if (cache !== undefined) {
        return cache
    }
    const data = new FormData()
    data.append("file", file)
    let url: string | null = null
    let retryTimes = 0
    do {
        try {
            ;({ data: { url } } = await axios.post("https://cloud.hopex.top/apiv1/upfile/r2up.php", data))
        } catch (error) {
            if (!axios.isAxiosError(error)) {
                throw error
            } else if (error.status === 429/* Too Many Requests */ && retryTimes <= 6) {
                await new Promise((resolve) => setTimeout(resolve, Math.pow(2, retryTimes) * 1000))
                retryTimes++
            } else {
                throw error
            }
        }
    } while (url === null)
    uploadedMap.set(file, url)
    return url
}
