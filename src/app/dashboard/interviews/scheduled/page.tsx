"use client"
import React from 'react'
import { StatCard } from '@/components/custom/stats/StatCard'
import { DataTable } from './data-table'
import { columns } from './columns'
import { CountdownCard } from '@/components/custom/stats/Countdown'
import useScheduledInterviewsStats from '@/lib/hooks/interviews/use-scheduled-interview-stats'
import { CountUpNumber } from '@/motions/count-up-number'


const DashboardEvents = () => {
  const { 
    data: dataStats, 
    isLoading: isLoadingStats, 
    isError: isErrorStats, 
    isFetching: isFetchingStats
  } = useScheduledInterviewsStats()

  
  
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
          {/* <DataTable columns={columns} data={data} /> */}
        </main>
  )
}

export default DashboardEvents