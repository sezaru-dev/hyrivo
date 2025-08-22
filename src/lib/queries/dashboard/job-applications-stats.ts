import { JobApplicationStats } from "@/types"

export async function fetchDashboardJobApplicationsStats(): Promise<JobApplicationStats> {
  const res = await fetch("/api/job-applications/stats")
  if (!res.ok) {
    throw new Error("Failed to fetch job applications")
  }

  return res.json()
}
