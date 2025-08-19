'use client'
import React from 'react'
import { JobApplicationType } from '@/types'
import { DataTable } from './data-table'
import { columns } from './columns'
import useGetMissedInterviews from '@/lib/hooks/interviews/missed/use-missed-interviews'
import { Skeleton } from '@/components/ui/skeleton'

const DashboardCompletedInterview = () => {
  const { 
    data, 
    isLoading, 
    isError, 
  } = useGetMissedInterviews()
  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
          {/* Page Heading */}
          <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight">Missed Interviews</h1>
              <p className="text-muted-foreground text-sm">
                List of missed interviews for easy tracking and management.
              </p>
          </div>

          {isError ? (
            <div className="p-4 text-red-500 bg-red-50 border border-red-200 rounded">
              Failed to load interviews. Please try again later.
            </div>
          ) : isLoading ? (
            <div className="space-y-4 py-4">
              <Skeleton className="h-9 w-full rounded" />
              <Skeleton className="h-72 w-full rounded" />
            </div>
          ) : (
            <DataTable columns={columns} data={data as JobApplicationType[] ?? []} />
          )}
        </main>
  )
}

export default DashboardCompletedInterview