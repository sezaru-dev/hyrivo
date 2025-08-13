import { JobApplicationType } from "@/types";
import { fetcher } from "../fetcher";

export const getScheduledInterviews = () =>
  fetcher("/api/interviews/scheduled", {
    method: "GET",
  });
  
export const updateScheduledInterviewNote = (id: string, data: Pick<JobApplicationType, "interviewNote">) =>
  fetcher(`/api/interviews/scheduled/${id}/notes`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

export const rescheduleInterview = (id: string, interviewAt: string) =>
fetcher(`/api/interviews/scheduled/${id}/reschedule`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ interviewAt }),
});

export const changeInterviewStatus = (id: string, interviewStatus: "missed" | "completed") =>
  fetcher(`/api/interviews/scheduled/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ interviewStatus }),
});