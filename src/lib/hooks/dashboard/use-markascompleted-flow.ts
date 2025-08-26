import { JobApplicationType } from "@/types"
import { useMutation } from "@tanstack/react-query"

export function useMarkAsCompletedFlow() {

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
    mutationFn: async (interviewAt: Pick<JobApplicationType, "interviewAt"> ) => {
      const res = await fetch(`/api/timeline/job-application/interviews`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interviewAt),
      })
      if (!res.ok) throw new Error("Failed to patch timeline")
      return res.json()
    },
  })

  //  Master flow
  const run = async (appData: JobApplicationType) => {

     try {
        // Update the application
        const newApp = await markAsCompleted.mutateAsync(appData._id);

        // Patch the timeline using the interviewAt
        await patchTimeline.mutateAsync({interviewAt: appData.interviewAt});

        return newApp;
      } catch (err) {
        console.error("Failed to update application or patch timeline:", err);
        throw err; // propagate the error so the caller knows
      }
  }

  return { run, markAsCompleted, patchTimeline }
}
