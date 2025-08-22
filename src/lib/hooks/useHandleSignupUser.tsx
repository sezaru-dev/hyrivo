import { useRouter } from "next/navigation"
import { SignupFormValues } from "../form/validations/input-schema"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

export function useHandleSignupUser() {
  const router = useRouter()

  return async (
    data: SignupFormValues,
    signupUser: (data: SignupFormValues) => Promise<unknown>,
    reset?: () => void
  ) => {
    toast.promise(
      (async () => {
        try {
          await signupUser(data)

          const res = await signIn("credentials", {
            redirect: false,
            email: data.email,
            password: data.password,
          })

          if (res?.error) {
            throw new Error("Signup succeeded, but login failed.")
          }

          reset?.()
          router.replace("/dashboard")
        } catch (err: unknown) {
          // Normalize error as Error instance
          let errorMessage = "Signup failed"

          if (err instanceof Error) {
            errorMessage = err.message
          } else if (
            typeof err === "object" &&
            err !== null &&
            "response" in err &&
            typeof (err as { response?: { json: () => Promise<unknown> } }).response?.json === "function"
          ) {
            const errorBody = await (err as { response: { json: () => Promise<unknown> } }).response.json()
            if (typeof errorBody === "object" && errorBody !== null && "error" in errorBody) {
              errorMessage = (errorBody as { error?: string }).error || errorMessage
            }
          }

          throw new Error(errorMessage)
        }
      })(),
      {
        loading: <span>Submitting application...</span>,
        success: <span className="text-green-500">Signup successful. Redirecting...</span>,
        error: (err: unknown) => {
          let msg = "Signup failed"

          if (err instanceof Error) {
            msg = err.message
          }

          return <span className="text-red-500">{msg}</span>
        },
      }
    )
  }
}
