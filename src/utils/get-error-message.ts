import axios from "axios"

export function getErrorMessage(error: unknown): string {
    if (typeof error === "object") {
        if (axios.isAxiosError(error)) {
            const { response, message } = error
            return response?.data?.message ?? message
        } else if (error instanceof Error) {
            return error.message
        } else {
            return JSON.stringify(error)
        }
    } else {
        return String(error)
    }
}
