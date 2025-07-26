// lib/hooks/use-job-applications.ts
import { useQuery } from "@tanstack/react-query"
import { fetchJobApplications } from "../queries/job-applications"

export function useJobApplications() {
  return useQuery({
    queryKey: ["job-applications"],
    queryFn: fetchJobApplications,
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
