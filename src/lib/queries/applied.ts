import { JobApplicationType } from "@/types";
import { fetcher } from "./fetcher";

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
