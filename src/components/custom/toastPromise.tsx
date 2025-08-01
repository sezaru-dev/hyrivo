import { toast } from "sonner"

type ToastMessages = {
  loading?: string
  success?: string
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
        success: (data: any) => {
          if (typeof data === "object" && "message" in data && typeof data.message === "string") {
            return <span className="text-green-500">{data.message}</span>
          }
          return messages.success ?? <span className="text-green-500">Success!</span>
        },
        error: (err: any) => {
          if (err instanceof Response) {
            return err
              .json()
              .then((json) => (
                <span className="text-red-500">
                  {json.error ?? messages.error ?? "Something went wrong."}
                </span>
              ))
              .catch(() => (
                <span className="text-red-500">{messages.error ?? "Something went wrong."}</span>
              ))
          }

          return (
            <span className="text-red-500">
              {err?.message ?? messages.error ?? "Something went wrong."}
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

