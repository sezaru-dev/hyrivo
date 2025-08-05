import { InterviewStats } from "@/types"

export async function fetchScheduledInterviewsStats(): Promise<InterviewStats> {
  const res = await fetch("/api/interviews/scheduled/stats")
  if (!res.ok) {
    throw new Error("Failed to fetch job applications")
  }

  return res.json()
}
