import React from 'react'
import { CirclePlus } from "lucide-react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/custom/stats/StatCard'
import { DataTable } from './data-table'
import { columns } from './columns'
import { jobApplications } from '../../../constant/constant-data'
import { JobApplicationType } from '@/types'
import NewApplicationModal from '@/components/custom/modals/NewApplicationModal'


async function getData(): Promise<JobApplicationType[]> {
  // Fetch data from your API here.
  return jobApplications
}

const JobApplicationPage = async () => {
  const data = await getData()
  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
          {/* Page Heading */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Job Applications</h1>
              <p className="text-muted-foreground text-sm">Browse and manage your submitted job applications.</p>
            </div>
            <NewApplicationModal/>
          </div>
    
          {/* stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            <StatCard title="Applied" value="3" />
            <StatCard title="Interviews" value="3" />
            <StatCard title="Offer" value="2" />
            <StatCard title="Hired" value="1" />
            <StatCard title="Rejected" value="5" />
            <StatCard title="Total Application" value="12" />
          </div>
          <DataTable columns={columns} data={data} />
    
    
        </main>
  )
}

export default JobApplicationPage