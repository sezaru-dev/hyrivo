import { JobApplicationType } from "@/types"
import { fetcher } from "./fetcher";
import { InputFormValues } from "../form/validations/input-schema";

export async function fetchJobApplications(limit?: number): Promise<JobApplicationType[]> {
  const url = limit ? `/api/job-applications?limit=${limit}` : `/api/job-applications`

  const res = await fetch(url)
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
  
export const deleteJobApplication = (id: string) =>
  fetcher(`/api/job-applications/${id}/delete`, {
    method: "DELETE",
  });

  export const updateApplicationStatus = (id: string, status: 'applied' | 'interview' | 'offered' | 'hired' | 'rejected') =>
  fetcher(`/api/job-applications/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
});