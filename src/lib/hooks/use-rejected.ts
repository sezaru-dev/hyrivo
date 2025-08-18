import { useQuery } from '@tanstack/react-query'
import { getRejectedApplications } from '../queries/rejected'

const useGetRejectedApplications = () => {
  return useQuery({
    queryKey: ["rejected-applications"],
    queryFn: getRejectedApplications,
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export default useGetRejectedApplications