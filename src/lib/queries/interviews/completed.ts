import { CompletedInterviewStats, JobApplicationType } from "@/types";
import { fetcher } from "../fetcher";

export const getCompletedInterviews = () =>
  fetcher("/api/interviews/completed", {
    method: "GET",
  });

export async function fetchCompletedInterviewsStats(): Promise<CompletedInterviewStats> {
  const res = await fetch("/api/interviews/completed/stats")
  if (!res.ok) {
    throw new Error("Failed to fetch completed interviews stats")
  }

  return res.json()
}

export const updateCompletedInterviewRemarks = (id: string, data: Pick<JobApplicationType, "interviewRemarks">) =>
  fetcher(`/api/interviews/completed/${id}/remarks`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });