import { NewApplicationFormValues } from "@/lib/form/validations/input-schema"
import { useMutation } from "@tanstack/react-query"

type TimelineParams = {
  field: "applied" | "interview"
  oldDate?: string // optional, for "edit" mode
  newDate: string
}

export function useCreateApplicationFlow() {

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
    mutationFn: async ({field = "applied", oldDate, newDate}:TimelineParams) => {
      const res = await fetch(`/api/timeline/job-application`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
       body: JSON.stringify({
          field: field,
          oldDate: oldDate,
          newDate: newDate,
        }),

      })
      if (!res.ok) throw new Error("Failed to patch timeline")
      return res.json()
    },
  })

  //  Master flow
  const run = async (appData: NewApplicationFormValues, timelineData: TimelineParams) => {
    const newApp = await createApplication.mutateAsync(appData)

  await patchTimeline.mutateAsync({
    field: timelineData.field,
    oldDate: timelineData.oldDate,
    newDate: newApp.appliedDate, // fallback to app date
  })

  return newApp
  }

  return { run, createApplication, patchTimeline }
}
