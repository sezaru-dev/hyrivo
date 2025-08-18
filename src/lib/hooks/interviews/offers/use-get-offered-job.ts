import { getOfferedJobs } from '@/lib/queries/users/offered/offered'
import { useQuery } from '@tanstack/react-query'

const useGetOfferedJobs = () => {
  return useQuery({
    queryKey: ["offered-jobs"],
    queryFn: getOfferedJobs,
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export default useGetOfferedJobs