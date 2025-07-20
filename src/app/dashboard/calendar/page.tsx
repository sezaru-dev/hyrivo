import React from 'react'
import { StatCard } from '@/components/custom/stats/StatCard'
/* import { DataTable } from './data-table'
import { columns } from './columns' */
import { archievesData } from '../../../constant/constant-data'
import { JobApplicationType } from '@/types'

async function getData(): Promise<JobApplicationType[]> {
  // Fetch data from your API here.
  return archievesData
}

const DashboardCalendar = async () => {
  const data = await getData()
  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
          {/* Page Heading */}
          <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
              <p className="text-muted-foreground text-sm">
                Stay on top of interviews and follow-ups. Events are based on job applications.
              </p>
          </div>
    
          {/* stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard title="Upcoming Interviews" value="2" />
            <StatCard title="Pending Follow-ups" value="3" />
            <StatCard title="Total Events" value="6" />

          </div>
          {/* <DataTable columns={columns} data={data} /> */}
        </main>
  )
}

export default DashboardCalendar