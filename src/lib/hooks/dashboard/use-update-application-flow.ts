import { UpdateApplicationFormValues } from "@/lib/form/validations/input-schema"
import { useMutation } from "@tanstack/react-query"

type TimelineParams = {
  field: "applied" | "interview"
  oldDate?: string // optional, for "edit" mode
  newDate: string
}

type UpdateApplicationParams = {
  id: string
  data: UpdateApplicationFormValues
}

type UpdateFlowParams = {
  appData: {
    id: string
    data: UpdateApplicationFormValues
  }
  timelineData: TimelineParams
}

export function useUpdateApplicationFlow() {


  const updateApplication = useMutation({
    mutationFn: async ({id, data}: UpdateApplicationParams) => {
      const res = await fetch(`/api/job-applications/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to update application")
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
  const run = async ({appData, timelineData}:UpdateFlowParams) => {
    const newApp = await updateApplication.mutateAsync({id:appData.id, data: appData.data})

  await patchTimeline.mutateAsync({
    field: timelineData.field,
    oldDate: timelineData.oldDate,
    newDate: newApp.appliedDate, // fallback to app date
  })

  return newApp
  }

  return { run, updateApplication, patchTimeline }
}
