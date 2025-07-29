import { JobApplicationType } from "@/types"
import { fetcher } from "./fetcher";
import { InputFormValues } from "../form/validations/input-schema";

export async function fetchJobApplications(): Promise<JobApplicationType[]> {
  const res = await fetch("/api/job-applications")
  if (!res.ok) {
    throw new Error("Failed to fetch job applications")
  }

  return res.json()
}

export const createJobApplication = (data: InputFormValues) =>
  fetcher("/api/job-applications", {
    method: "POST",
    body: JSON.stringify(data),
  });
