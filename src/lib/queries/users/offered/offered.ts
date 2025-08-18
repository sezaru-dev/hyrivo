import { fetcher } from "../../fetcher";

export const getOfferedJobs = () =>
  fetcher("/api/job-applications/offered", {
    method: "GET",
  });