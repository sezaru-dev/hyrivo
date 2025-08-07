"use client"
import React from 'react'
import { StatCard } from '@/components/custom/stats/StatCard'
import { DataTable } from './data-table'
import { columns } from './columns'
import { CountdownCard } from '@/components/custom/stats/Countdown'
import useScheduledInterviewsStats from '@/lib/hooks/interviews/use-scheduled-interview-stats'
import { CountUpNumber } from '@/motions/count-up-number'
import useGetScheduledInterviews from '@/lib/hooks/interviews/use-scheduled-interviews'
import { Skeleton } from '@/components/ui/skeleton'
import { JobApplicationType } from '@/types'


const DashboardEvents = () => {
  const { 
    data: dataStats, 
    isLoading: isLoadingStats, 
    isError: isErrorStats, 
    isFetching: isFetchingStats
  } = useScheduledInterviewsStats()
  const { 
    data: interviews, 
    isLoading: isLoadingInterviews, 
    isError: isErrorInterviews, 
    isFetching: isFetchingInterviews
  } = useGetScheduledInterviews()

  
  
  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
          {/* Page Heading */}
          <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight">Scheduled Interviews</h1>
              <p className="text-muted-foreground text-sm">
                Stay prepared and on top of upcoming, weekly, and overdue interviews.
              </p>
          </div>
    
          {/* stats */}

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CountdownCard data={dataStats?.nextInterviewIn}/>
            <StatCard title="Upcoming Interviews" value={<CountUpNumber to={dataStats?.upcoming ?? 0} />} />
            <StatCard title="This Week's Interviews" value={<CountUpNumber to={dataStats?.thisWeek ?? 0} />} isPositive />
            <StatCard title="Overdue Interviews" value={<CountUpNumber to={dataStats?.overdue ?? 0} />} />

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

export default DashboardEvents