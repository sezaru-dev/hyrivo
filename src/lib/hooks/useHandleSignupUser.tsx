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
          router.push("/dashboard")
        } catch (err: any) {
          // If the error came from `signupUser` and includes a response body
          if (err?.response?.json) {
            const errorBody = await err.response.json()
            throw new Error(errorBody?.error || "Signup failed")
          }
          // Fallback for non-HTTP errors
          throw new Error(err?.message || "Signup failed")
        }
      })(),
      {
        loading: <span>Submitting application...</span>,
        success: <span className="text-green-500">Signup successful. Redirecting...</span>,
        error: (err) => (
          <span className="text-red-500">{err.message || "Signup failed"}</span>
        ),
      }
    )
  }
}
