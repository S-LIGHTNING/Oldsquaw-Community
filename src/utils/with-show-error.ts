import { showError } from "./show-error"

export function withShowError<T extends Function>(originalFunction: T): T {
    return function (this: unknown) {
        let returnValue
        try {
            returnValue = originalFunction.apply(this, arguments)
            if (returnValue instanceof Promise) {
                returnValue = returnValue.catch(showError)
            }
            return returnValue
        } catch (error) {
            showError(error)
        }
    } as unknown as T
}
