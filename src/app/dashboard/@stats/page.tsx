'use client'
import { StatCard } from '@/components/custom/stats/StatCard'
import useJobApplicationsStats from '@/lib/hooks/use-job-appliactions-stats'
import { CountUpNumber } from '@/motions/count-up-number'
import React from 'react'

export default function StatsSlot() {
  const { 
    data, 
    isLoading, 
    isError, 
  } = useJobApplicationsStats()
  if (isLoading) {
    <p>Loading...</p>
  }
  if (isError) {
    <p>Error!</p>
  }
  return (
    <div className="flex flex-1 flex-col gap-4 py-4 pt-0">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <StatCard title="Total" value={<CountUpNumber to={data?.total ?? 0} />} />
        <StatCard title="Applied" value={<CountUpNumber to={data?.applied ?? 0} />} />
        <StatCard title="Interviews" value={<CountUpNumber to={data?.interview ?? 0} />} />
        <StatCard title="Offer" value={<CountUpNumber to={data?.offered ?? 0} />} />
        <StatCard title="Hired" value={<CountUpNumber to={data?.hired ?? 0} />} />
        <StatCard title="Rejected" value={<CountUpNumber to={data?.rejected ?? 0} />} />
      </div>
    </div>
  )
}
