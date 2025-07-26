"use client"

import { useJobApplications } from "@/lib/hooks/use-job-applications"
import { StatCard } from "@/components/custom/stats/StatCard"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import NewApplicationModal from "@/components/custom/modals/NewApplicationModal"

const JobApplicationPage = () => {
  const { data, isLoading, isError, isFetching } = useJobApplications()

  if (isLoading) {
    return (
      <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
        <p>Loading...</p>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
        <p>Failed to load job applications.</p>
      </main>
    )
  }

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
        <StatCard title="Applied" value="3" />
        <StatCard title="Interviews" value="3" />
        <StatCard title="Offer" value="2" />
        <StatCard title="Hired" value="1" />
        <StatCard title="Rejected" value="5" />
        <StatCard title="Total Application" value="12" />
      </div>

      {isFetching && (
        <p className="text-sm text-muted-foreground">Updating data...</p>
      )}

      <DataTable columns={columns} data={data ?? []} />
    </main>
  )
}

export default JobApplicationPage
