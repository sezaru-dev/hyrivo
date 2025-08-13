import { CompletedInterviewStats } from "@/types";
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