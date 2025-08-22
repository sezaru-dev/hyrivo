import { useMutation } from "@tanstack/react-query"

export function useMarkAsCompletedFlow() {

  const createTimeline = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/timeline/job-application", {
        method: "POST",
        body: JSON.stringify( 'interview' ), // send status
      })

      if (res.ok) return { status: "created", ...(await res.json()) }

      if (res.status === 409) {
        const error = await res.json()
        return { status: "conflict", _id: error.timelineId } // reuse existing
      }

      throw new Error("Failed to create timeline")
    },
  })

  const markAsCompleted = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/interviews/scheduled/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ interviewStatus: "completed" }),
      })
      if (!res.ok) throw new Error("Failed to mark as completed")
      return res.json()
    },
  })

  const patchTimeline = useMutation({
    mutationFn: async (timelineId: string ) => {
      const res = await fetch(`/api/timeline/job-application/${timelineId}`, {
        method: "PATCH",
        body: JSON.stringify('interview'), // consistent with POST
      })
      if (!res.ok) throw new Error("Failed to patch timeline")
      return res.json()
    },
  })

  //  Master flow
  const run = async (appData: string) => {
    const timeline = await createTimeline.mutateAsync()

    if (timeline.status === "created") {
      // timeline already has applied: 1 because POST handled $inc
      await markAsCompleted.mutateAsync(appData)
      return
    }

    if (timeline.status === "conflict") {
      // timeline exists → create app + increment applied
      await markAsCompleted.mutateAsync(appData)
      await patchTimeline.mutateAsync(timeline._id) // pass object
      return
    }
  }

  return { run, createTimeline, markAsCompleted, patchTimeline }
}
