import React from 'react'
import { StatCard } from '@/components/custom/stats/StatCard'
import { DataTable } from './data-table'
import { columns } from './columns'
import { jobInterviews } from '../../../../constant/constant-data'
import { JobApplicationType } from '@/types'
import { CountdownCard } from '@/components/custom/stats/Countdown'

async function getData(): Promise<JobApplicationType[]> {
  // Fetch data from your API here.
  return jobInterviews
}

const DashboardEvents = async () => {
  const data = await getData()
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
            <CountdownCard/>
            <StatCard title="Upcoming Interviews" value="10" />
            <StatCard title="This Week's Interviews" value="6" change="2" isPositive />
            <StatCard title="Overdue Interviews" value="2" />

          </div>
          <DataTable columns={columns} data={data} />
        </main>
  )
}

export default DashboardEvents