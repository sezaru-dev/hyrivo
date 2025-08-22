import { JobApplicationType } from "@/types";
/* import { NewApplicationFormValues } from "../form/validations/input-schema"; */
import { fetcher } from "./fetcher";


export const fetchJobApplicationsStatusApplied = () =>
  fetcher<JobApplicationType[]>("/api/job-applications/applied", {
    method: "GET",
  });

/* export const createJobApplicationtest = (data: NewApplicationFormValues) =>
  fetcher("/api/job-applications/applied", {
    method: "POST",
    body: JSON.stringify(data),
  }); */

// PATCH /api/job-applications/applied/:id
  export const setInterviewSchedule = (id: string, data: Pick<JobApplicationType, "interviewAt" | "interviewMethod" | "interviewNote">) => {
  return fetcher(`/api/job-applications/applied/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // just send the key
  });
};
