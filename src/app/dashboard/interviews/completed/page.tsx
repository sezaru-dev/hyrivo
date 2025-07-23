import React from 'react'
import { StatCard } from '@/components/custom/stats/StatCard'
/* import { DataTable } from './data-table'
import { columns } from './columns' */
import { jobInterviews } from '../../../../constant/constant-data'
import { JobApplicationType } from '@/types'
import { DateStatCard } from '@/components/custom/stats/DateStatCard'

async function getData(): Promise<JobApplicationType[]> {
  // Fetch data from your API here.
  return jobInterviews
}

const DashboardCompletedInterview = async () => {
  const data = await getData()
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
            <StatCard title="Completed This Week" value="12" change="4" isPositive />
            <StatCard title="Total Completed" value="48" />
            <StatCard title="Completion Rate" value="82%" change="5%" isPositive />
{/*             <StatCard title="Last Completed Interview" value="July 20, 2025" /> */}
            <DateStatCard title="Last Completed Interview" value="July 20, 2025" />
          </div>
          {/* <DataTable columns={columns} data={data} /> */}
        </main>
  )
}

export default DashboardCompletedInterview