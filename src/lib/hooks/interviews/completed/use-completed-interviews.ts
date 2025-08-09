import { getCompletedInterviews } from '@/lib/queries/interviews/completed'
import { useQuery } from '@tanstack/react-query'

const useGetCompletedInterviews = () => {
  return useQuery({
    queryKey: ["completed-interviews"],
    queryFn: getCompletedInterviews,
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export default useGetCompletedInterviews