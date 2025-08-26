"use client"

import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Skeleton } from "@/components/ui/skeleton"
import NewApplicationModal from "@/components/custom/modals/NewApplicationModal"
import { useJobApplications } from "@/lib/hooks/use-job-applications"
import { StatCard } from "@/components/custom/stats/StatCard"
import { CountUpNumber } from "@/motions/count-up-number"
import useDashboardJobApplicationsStats from "@/lib/hooks/dashboard/use-dashboard-job-appliactions-stats"

const JobApplicationPage = () => {

  const { 
    data:stats, 
  } = useDashboardJobApplicationsStats()
  const { 
    data: jobApplications, 
    isLoading: isLoadingApplications, 
  } = useJobApplications()


  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Applications</h1>
          <p className="text-muted-foreground text-sm">
            Browse and manage your submitted job applications.
          </p>
        </div>
        <NewApplicationModal />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard title="Applied" value={<CountUpNumber to={stats?.applied ?? 0} />} />
        <StatCard title="Interviews" value={<CountUpNumber to={stats?.interview ?? 0} />} />
        <StatCard title="Offer" value={<CountUpNumber to={stats?.offered ?? 0} />} />
        <StatCard title="Hired" value={<CountUpNumber to={stats?.hired ?? 0} />} />
        <StatCard title="Rejected" value={<CountUpNumber to={stats?.rejected ?? 0} />} />
        <StatCard title="Total" value={<CountUpNumber to={stats?.total ?? 0} />} />
      </div>

      {isLoadingApplications ? (
      <div className="space-y-4 py-4">
        <Skeleton className="h-9 w-full rounded" />
        <Skeleton className="h-80 w-full rounded" />
      </div>
      ) : (
      <DataTable columns={columns} data={jobApplications ?? []} />
      )}
    </main>
  )
}

export default JobApplicationPage
