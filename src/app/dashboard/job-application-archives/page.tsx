import React from 'react'
import { CirclePlus } from "lucide-react"
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/custom/stats/StatCard'
import { DataTable } from './data-table'
import { columns } from './columns'
import { archievesData } from '../../../constant/constant-data'
import { JobApplicationType } from '@/types'


async function getData(): Promise<JobApplicationType[]> {
  // Fetch data from your API here.
  return archievesData
}

const JobApplicationPage = async () => {
  const data = await getData()
  return (
    <main className="flex-1 p-6 md:p-8 space-y-6 mt-8">
          {/* Page Heading */}
          <div className="mb-4">
              <h1 className="text-2xl font-bold tracking-tight">Archives</h1>
              <p className="text-muted-foreground text-sm">View your archived job applications, including rejected and inactive ones. Keep your main tracker focused by organizing closed applications here.</p>
          </div>
    
          {/* stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatCard title="Rejected" value="3" />
            <StatCard title="Inactive" value="3" />
            <StatCard title="Archived Applications (%)" value="3" />

          </div>
          <DataTable columns={columns} data={data} />
    
    
        </main>
  )
}

export default JobApplicationPage