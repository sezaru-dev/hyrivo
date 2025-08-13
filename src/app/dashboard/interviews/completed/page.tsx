'use client'
import React from 'react'
import { StatCard } from '@/components/custom/stats/StatCard'

import { jobInterviews } from '../../../../constant/constant-data'
import { JobApplicationType } from '@/types'
import { DateStatCard } from '@/components/custom/stats/DateStatCard'
import { DataTable } from './data-table'
import { columns } from './columns'
import useGetCompletedInterviews from '@/lib/hooks/interviews/completed/use-completed-interviews'
import { Skeleton } from '@/components/ui/skeleton'
import useCompletedInterviewStats from '@/lib/hooks/interviews/completed/use-completed-interview-stats'
import { CountUpNumber } from '@/motions/count-up-number'

const DashboardCompletedInterview = () => {
  const { 
    data: dataStats, 
    isLoading: isLoadingStats, 
    isError: isErrorStats, 
    isFetching: isFetchingStats
  } = useCompletedInterviewStats()
  const { 
    data: interviews, 
    isLoading: isLoadingInterviews, 
    isError: isErrorInterviews, 
    isFetching: isFetchingInterviews
  } = useGetCompletedInterviews()

  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
          {/* Page Heading */}
          <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight">Completed Interviews</h1>
              <p className="text-muted-foreground text-sm">
                Review completed interviews, monitor trends, and analyze interview outcomes.
              </p>
          </div>
    
          {/* stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Completed This Week" value={<CountUpNumber to={dataStats?.completedThisWeek ?? 0} />} />
            <StatCard title="Total Completed" value={<CountUpNumber to={dataStats?.totalCompleted ?? 0} />} />
            <StatCard title="Completion Rate" 
              value={<CountUpNumber to={dataStats?.completionRate.rate ?? 0} symbol="%" />}
              change={(dataStats?.completionRate.trend.value ?? "").toString().replace(/^-/, "")}
              direction={dataStats?.completionRate.trend.direction}
              />
            <DateStatCard title="Last Completed Interview" value={dataStats?.lastCompletedInterview ?? "N/A"}  />
          </div>
          {isErrorInterviews ? (
            <div className="p-4 text-red-500 bg-red-50 border border-red-200 rounded">
              Failed to load interviews. Please try again later.
            </div>
          ) : isLoadingInterviews ? (
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
            <DataTable columns={columns} data={interviews as JobApplicationType[] ?? []} />
          )}
        </main>
  )
}

export default DashboardCompletedInterview