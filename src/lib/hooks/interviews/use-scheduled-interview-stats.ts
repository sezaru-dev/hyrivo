import { fetchScheduledInterviewsStats } from '@/lib/queries/interviews/scheduled-stats'
import { useQuery } from '@tanstack/react-query'


const useScheduledInterviewsStats = () => {
  return useQuery({
    queryKey: ["scheduled-interview-stats"],
    queryFn: fetchScheduledInterviewsStats,
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export default useScheduledInterviewsStats