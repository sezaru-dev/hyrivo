import { ReactNode } from "react"
import { toast } from "sonner"

type ToastMessages = {
  loading?: string | ReactNode
  success?: string | ((data: unknown) => ReactNode)
  error?: string | ((err: unknown) => ReactNode)
}

interface ToastDataWithMessage {
  message?: string
  error?: string
}

export async function toastPromise<T>(
  promiseFn: () => Promise<T>,
  messages: ToastMessages = {}
): Promise<T | undefined> {
  try {
    const result = await toast.promise(promiseFn(), {
      loading: <span>{messages.loading ?? "Loading..."}</span>,
      success: (data) => {
        if (typeof messages.success === "function") {
          return messages.success(data)
        }
        const maybeMessage = (data as ToastDataWithMessage)?.message
        return maybeMessage ? (
          <span className="text-green-500">{maybeMessage}</span>
        ) : (
          <span className="text-green-500">{messages.success ?? "Success!"}</span>
        )
      },
      error: (err) => {
        if (typeof messages.error === "function") {
          return messages.error(err)
        }
        const maybeErr = (err as ToastDataWithMessage)?.message
        return maybeErr ? (
          <span className="text-red-500">{maybeErr}</span>
        ) : (
          <span className="text-red-500">{messages.error ?? "Something went wrong."}</span>
        )
      },
    }).unwrap()

    return result
  } catch (err) {
    console.error("toastPromise error:", err)
    return undefined
  }
}

