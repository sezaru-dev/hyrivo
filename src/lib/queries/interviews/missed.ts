import { fetcher } from "../fetcher";

export const getMissedInterviews = () =>
  fetcher("/api/interviews/missed", {
    method: "GET",
  });