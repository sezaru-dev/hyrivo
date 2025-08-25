import StatusBadge from '@/components/custom/badges/StatusBadge'
import { Separator } from '@/components/ui/separator'
import { JobApplicationType } from '@/types'
import { capitalize } from '@/utils/capitalize'
import { formatAppliedDate } from '@/utils/formatAppliedDate'
import { formatInterviewDate } from '@/utils/formatInterviewDate'
import { formatSalaryPeso } from '@/utils/formatSalaryPeso'
import React from 'react'
import EditButton from './EditButton'
type ThisComponentProps = {
  data: JobApplicationType
}

const DetailsPageContent = ({data}:ThisComponentProps) => {
  return (
    <main className="flex-1 p-6 md:p-8 space-y-8 mt-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{data?.companyName}</h1>
          <h2 className="text-lg text-muted-foreground">
            {data?.jobTitle}
          </h2>
          <StatusBadge status={data?.status} />
        </div>
        <EditButton data={data} />
      </div>
      <Separator/>

      <div className='grid md:grid-cols-2 gap-8'>
        {/* Application Details */}
        <article className="p-6 rounded-xl border bg-card shadow-sm">
          <header className="mb-4">
            <h3 className="font-bold text-lg">Application Details</h3>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-muted-foreground">Application Date</p>
              <p className="font-medium">{formatAppliedDate(data.appliedDate)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Job Type</p>
              <p className="font-medium">{data.jobType}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Salary</p>
              <p className="font-medium">{formatSalaryPeso(data.salary)}</p>
            </div>
          </div>
        </article>

        {/* Interview Details */}
        <article className="p-6 rounded-xl border bg-card shadow-sm">
          <header className="mb-4">
            <h3 className="font-bold text-lg">Interview Details</h3>
          </header>
          <div className="space-y-12">
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Interview Status</p>
                <p className="font-medium">{capitalize(data.interviewStatus)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Date</p>
                <p className="font-medium">{formatInterviewDate(data.interviewAt)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Method</p>
                <p className="font-medium">{capitalize(data.interviewMethod)}</p>
              </div>
            </div>

            {/* Notes & Remarks */}
            <div className="grid grid-cols-1 md:col-span-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="font-medium leading-relaxed max-w-prose">
                  {data.interviewNote || "No notes added."}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Remarks</p>
                <p className="font-medium leading-relaxed max-w-prose">
                  {data.interviewRemarks || "No remarks added."}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>
  )
}

export default DetailsPageContent