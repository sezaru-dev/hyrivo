
import { toast } from "sonner"
import { InputFormValues, InterviewDateFormValues, RemarksFormValues, SignupFormValues } from "../validations/input-schema"
import { useModalStore } from "@/stores/features/useModalStore";


export const submitJobApplication = async(
  data: InputFormValues,
  createJobApplication: (data: InputFormValues) => Promise<unknown>,
  reset?: () => void
) => {
  const closeModal = useModalStore.getState().closeNewAppModal;
  console.log("[SUBMIT] Data sent to backend:", data)
  toast.promise(
    createJobApplication(data),
    {
      loading: <span>Submitting application...</span>,
      success: () => {
        reset?.()
        closeModal(); // Close modal after success
        return <span className="text-green-500">Application submitted successfully</span>
      },
      error: (err) => {
        console.error("Submission error:", err)
        return <span className="text-red-500">Failed to submit application</span>
      },
    }
  )
}

export function handleRemarksInputSubmit(data: RemarksFormValues) {
  toast("You submitted the following values", {
    description: (
      <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}
export function handleReschedInterviewInputSubmit(data: InterviewDateFormValues) {
  toast("You submitted the following values", {
    description: (
      <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
      </pre>
    ),
  })
}

export const handleSignupUser = async(
  data: SignupFormValues,
  signupUser: (data: SignupFormValues) => Promise<unknown>,
  reset?: () => void
) => {
  toast.promise(
    signupUser(data),
    {
      loading: <span>Submitting application...</span>,
      success: () => {
        reset?.()
        return <span className="text-green-500">Application submitted successfully</span>
      },
      error: (err) => {
        console.error("Submission error:", err)
        return <span className="text-red-500">Failed to submit application</span>
      },
    }
  )
}