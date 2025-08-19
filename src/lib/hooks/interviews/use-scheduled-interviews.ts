import { getScheduledInterviews } from '@/lib/queries/interviews/scheduled'
import { JobApplicationType } from '@/types'
import { useQuery } from '@tanstack/react-query'

const useGetScheduledInterviews = (limit?: number) => {
  return useQuery<JobApplicationType[]>({
    queryKey: ["scheduled-interviews", limit],
    queryFn: () => getScheduledInterviews(limit),
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export default useGetScheduledInterviews