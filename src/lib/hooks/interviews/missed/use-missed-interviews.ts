import { getMissedInterviews } from '@/lib/queries/interviews/missed'
import { useQuery } from '@tanstack/react-query'

const useGetMissedInterviews = () => {
  return useQuery({
    queryKey: ["missed-interviews"],
    queryFn: getMissedInterviews,
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export default useGetMissedInterviews