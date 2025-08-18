import { fetcher } from "./fetcher";

export const getRejectedApplications = () =>
  fetcher("/api/job-applications/rejected", {
    method: "GET",
  });