import { toast } from "sonner"

type ToastMessages = {
  loading?: string
  success?: string
  error?: string
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
    const result = await toast
      .promise(promiseFn(), {
        loading: messages.loading ?? "Please wait...",
        success: (data) => {
          // Narrow type safely
          const maybeMessage = (data as unknown) as ToastDataWithMessage
          if (maybeMessage?.message && typeof maybeMessage.message === "string") {
            return <span className="text-green-500">{maybeMessage.message}</span>
          }
          return messages.success ?? <span className="text-green-500">Success!</span>
        },
        error: (err) => {
          if (err instanceof Response) {
            return err
              .json()
              .then((json: unknown) => {
                const maybeJson = json as ToastDataWithMessage
                return (
                  <span className="text-red-500">
                    {maybeJson?.message ?? maybeJson?.error ?? messages.error ?? "Something went wrong."}
                  </span>
                )
              })
              .catch(() => (
                <span className="text-red-500">{messages.error ?? "Something went wrong."}</span>
              ))
          }

          const maybeErr = err as unknown as ToastDataWithMessage
          return (
            <span className="text-red-500">
              {maybeErr?.message ?? messages.error ?? "Something went wrong."}
            </span>
          )
        },
      })
      .unwrap()

    return result
  } catch (err) {
    console.error("toastPromise error:", err)
    return undefined
  }
}
