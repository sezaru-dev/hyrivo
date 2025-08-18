import { useQuery } from '@tanstack/react-query'
import { getAcceptedJobOffers } from '../queries/hired'

const useGetAcceptedJobOffers = () => {
  return useQuery({
    queryKey: ["hired-applications"],
    queryFn: getAcceptedJobOffers,
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export default useGetAcceptedJobOffers