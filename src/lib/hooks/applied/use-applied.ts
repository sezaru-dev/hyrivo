import { fetchJobApplicationsStatusApplied } from "@/lib/queries/applied";
import { useQuery } from "@tanstack/react-query";

export function useGetJobApplicationsStatusApplied() {
  return useQuery({
    queryKey: ["job-applications-applied"],
    queryFn: () => fetchJobApplicationsStatusApplied(),
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}