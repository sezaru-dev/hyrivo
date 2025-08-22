"use client"

import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Skeleton } from "@/components/ui/skeleton"
import { useGetJobApplicationsStatusApplied } from "@/lib/hooks/applied/use-applied"
import NewApplicationModal from "@/components/custom/modals/NewApplicationModal"

const JobApplicationPage = () => {
  const { 
    data: jobApplications, 
    isLoading: isLoadingApplications, 
  } = useGetJobApplicationsStatusApplied()


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

      {isLoadingApplications ? (
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
