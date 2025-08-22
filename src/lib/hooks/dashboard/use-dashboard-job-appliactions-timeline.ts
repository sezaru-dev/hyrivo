import { getJobApplicationTimeline } from '@/lib/queries/dashboard/areachartapplicationtimeline'
import { useQuery } from '@tanstack/react-query'

const useDashboardJobApplicationsTimeline = () => {
  return useQuery({
    queryKey: ["dashboard-job-applications-timeline"],
    queryFn: getJobApplicationTimeline,
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export default useDashboardJobApplicationsTimeline