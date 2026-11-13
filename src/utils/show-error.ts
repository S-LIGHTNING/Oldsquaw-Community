import { alert } from "../ui/dialogs/Alert.vue"
import { getErrorMessage } from "./get-error-message"

export function showError(error: unknown) {
    console.error(error)
    alert.error(getErrorMessage(error))
}
