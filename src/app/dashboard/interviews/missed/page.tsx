import React from 'react'
import { StatCard } from '@/components/custom/stats/StatCard'

import { jobInterviews } from '../../../../constant/constant-data'
import { JobApplicationType } from '@/types'
import { DateStatCard } from '@/components/custom/stats/DateStatCard'
import { DataTable } from './data-table'
import { columns } from './columns'

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
              <h1 className="text-2xl font-bold tracking-tight">Missed Interviews</h1>
              <p className="text-muted-foreground text-sm">
                Track missed interviews to understand drop-off patterns and improve follow-up strategies.
              </p>
          </div>
    
          {/* stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Missed This Week" value="3" change="1" isPositive={false} />
            <StatCard title="Total Missed" value="15" />
            <StatCard title="Missed Rate" value="18%" change="2%" isPositive={false} />
            <DateStatCard title="Last Missed Interview" value="July 21, 2025" />
          </div>
          <DataTable columns={columns} data={data} />
        </main>
  )
}

export default DashboardCompletedInterview