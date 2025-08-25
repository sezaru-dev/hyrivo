import { JobApplicationType } from "@/types"
import { fetcher } from "./fetcher";


export const fetchJobApplications = (limit?: number): Promise<JobApplicationType[]> =>
  fetcher(`/api/job-applications${limit? `?limit=${limit}`: ''}`, {
    method: "GET",
  });

export const fetchJobApplicationById = (id?: string): Promise<JobApplicationType> =>
  fetcher(`/api/job-applications/${id}`, {
    method: "GET",
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

// PUT /api/job-applications/id/edit
  export const updateJobApplicationData = (id: string, data: Omit<JobApplicationType, "_id">) => {
  return fetcher(`/api/job-applications/${id}/edit`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // just send the key
  });
};