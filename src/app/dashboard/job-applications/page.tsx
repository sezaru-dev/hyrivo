"use client"

import { useJobApplications } from "@/lib/hooks/use-job-applications"
import { StatCard } from "@/components/custom/stats/StatCard"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import NewApplicationModal from "@/components/custom/modals/NewApplicationModal"
import useJobApplicationsStats from "@/lib/hooks/use-job-appliactions-stats"
import { isError } from "lodash"
import { CountUpNumber } from "@/motions/count-up-number"
import { Skeleton } from "@/components/ui/skeleton"

const JobApplicationPage = () => {
  const { 
    data: jobApplications, 
    isLoading: isLoadingApplications, 
    isError: isErrorApplications, 
    isFetching: isFetchingApplications
  } = useJobApplications()
  const { 
    data: jobApplicationsStats, 
    isLoading: isLoadingApplicationStats, 
    isError: isErrorApplicationStats, 
    isFetching: isFetchingApplicationStats
  } = useJobApplicationsStats()

  /* if (isLoadingApplications || isLoadingApplicationStats) {
    return (
      <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
        <p>Loading...</p>
      </main>
    )
  }

  if (isErrorApplications || isErrorApplicationStats) {
    return (
      <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
        <p>Failed to load job applications.</p>
      </main>
    )
  } */

  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
      <div className="flex items-end justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Applications</h1>
          <p className="text-muted-foreground text-sm">
            Browse and manage your submitted job applications.
          </p>
        </div>
        <NewApplicationModal />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        
        <StatCard title="Applied" value={<CountUpNumber to={jobApplicationsStats?.applied ?? 0} />} />
        <StatCard title="Interviews" value={<CountUpNumber to={jobApplicationsStats?.interview ?? 0} />} />
        <StatCard title="Offer" value={<CountUpNumber to={jobApplicationsStats?.offered ?? 0} />} />
        <StatCard title="Hired" value={<CountUpNumber to={jobApplicationsStats?.hired ?? 0} />} />
        <StatCard title="Rejected" value={<CountUpNumber to={jobApplicationsStats?.rejected ?? 0} />} />
        <StatCard title="Total Application" value={<CountUpNumber to={jobApplicationsStats?.total ?? 0} />} />
      </div>


      {(isLoadingApplications || isFetchingApplications) ? (
      <div className="space-y-4 py-4">
        <Skeleton className="h-9 w-full rounded" />
        <Skeleton className="h-80 w-full rounded" />
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-9 w-full max-w-[14rem] rounded" />
          <Skeleton className="h-9 w-full max-w-[14rem] rounded" />
          <Skeleton className="h-9 w-full max-w-[14rem] rounded" />
        </div>
      </div>
      ) : (
      <DataTable columns={columns} data={jobApplications ?? []} />
      )}
    </main>
  )
}

export default JobApplicationPage
