import { fetcher } from "./fetcher";

export const getAcceptedJobOffers = () =>
  fetcher("/api/job-applications/hired", {
    method: "GET",
  });