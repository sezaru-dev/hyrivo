import { NewApplicationFormValues } from "@/lib/form/validations/input-schema"
import { useMutation } from "@tanstack/react-query"

export function useCreateApplicationFlow() {

  const createTimeline = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/timeline/job-application", {
        method: "POST",
        body: JSON.stringify( 'applied' ), // send status
      })

      if (res.ok) return { status: "created", ...(await res.json()) }

      if (res.status === 409) {
        const error = await res.json()
        return { status: "conflict", _id: error.timelineId } // reuse existing
      }

      throw new Error("Failed to create timeline")
    },
  })

  const createApplication = useMutation({
    mutationFn: async (data: NewApplicationFormValues) => {
      const res = await fetch("/api/job-applications/applied", {
        method: "POST",
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to create application")
      return res.json()
    },
  })

  const patchTimeline = useMutation({
    mutationFn: async (timelineId: string ) => {
      const res = await fetch(`/api/timeline/job-application/${timelineId}`, {
        method: "PATCH",
        body: JSON.stringify('applied'), // consistent with POST
      })
      if (!res.ok) throw new Error("Failed to patch timeline")
      return res.json()
    },
  })

  //  Master flow
  const run = async (appData: NewApplicationFormValues) => {
    const timeline = await createTimeline.mutateAsync()

    if (timeline.status === "created") {
      // timeline already has applied: 1 because POST handled $inc
      await createApplication.mutateAsync(appData)
      return
    }

    if (timeline.status === "conflict") {
      // timeline exists → create app + increment applied
      await createApplication.mutateAsync(appData)
      await patchTimeline.mutateAsync(timeline._id) // pass object
      return
    }
  }

  return { run, createTimeline, createApplication, patchTimeline }
}
