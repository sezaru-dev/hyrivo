import { useQuery } from '@tanstack/react-query'
import { fetchJobApplicationsStats } from '../queries/job-applications-stats'

const useJobApplicationsStats = () => {
  return useQuery({
    queryKey: ["job-applications-stats"],
    queryFn: fetchJobApplicationsStats,
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export default useJobApplicationsStats