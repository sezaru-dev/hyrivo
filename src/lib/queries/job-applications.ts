// lib/queries/job-applications.ts
import { JobApplicationType } from "@/types"

export async function fetchJobApplications(): Promise<JobApplicationType[]> {
  const res = await fetch("/api/job-applications")
  if (!res.ok) {
    throw new Error("Failed to fetch job applications")
  }

  return res.json()
}
