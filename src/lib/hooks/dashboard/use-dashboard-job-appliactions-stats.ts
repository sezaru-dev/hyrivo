import { fetchDashboardJobApplicationsStats } from '@/lib/queries/dashboard/job-applications-stats'
import { useQuery } from '@tanstack/react-query'

const useDashboardJobApplicationsStats = () => {
  return useQuery({
    queryKey: ["dashboard-job-applications-stats"],
    queryFn: fetchDashboardJobApplicationsStats,
    staleTime: 1000 * 60 * 5,         // Consider fresh for 5 mins
    refetchOnMount: true,            // Refetch in background if data is stale
    refetchOnWindowFocus: true,      // Useful if user switches tab
    refetchOnReconnect: true, 
  })
}
export default useDashboardJobApplicationsStats