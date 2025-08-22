import { NewApplicationFormValues } from "../../form/validations/input-schema";
import { fetcher } from "../fetcher";

export const getJobApplicationTimeline = () =>
  fetcher("api/timeline/job-application", {
    method: "GET",
  });

export const createJobApplicationTimeline = (data: NewApplicationFormValues) =>
  fetcher("/api/job-applications/applied", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateJobApplicationTimeline = (
  id: string,
  status: "applied" | "interview"
) => {
  return fetcher(`/api/job-applications/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }), // just send the key
  });
};
