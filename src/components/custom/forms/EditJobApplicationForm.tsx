"use client"
import React, { useCallback, useMemo } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { JobApplicationType } from '@/types'
import { Calendar } from "@/components/ui/calendar"
import { InterviewStatus, jobTypes, methodsOfInterview, statuses, UpdateApplicationFormSchema, UpdateApplicationFormValues } from "@/lib/form/validations/input-schema"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { zodResolver } from "@hookform/resolvers/zod"
import { capitalize } from "@/utils/capitalize"
import { CalendarIcon, Loader2 } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { DateTimePickerField } from './fields/DateTimePickerUpdate'
import CustomTooltip from '../tooltips/CustomTooltip'
import BackButton from '@/app/dashboard/job-applications/[id]/edit/BackButton'
import { useUpdateApplicationFlow } from '@/lib/hooks/dashboard/use-update-application-flow'
import { toastPromise } from '../toastPromise'
import { useQueryClient } from '@tanstack/react-query'

type ThisComponentProps = {
  data: JobApplicationType
}

const EditJobApplicationForm = ({data}:ThisComponentProps) => {
  const queryClient = useQueryClient();
  const { run, updateApplication, patchTimeline, } = useUpdateApplicationFlow()

  const defaultValues = useMemo(() => ({
    companyName: data.companyName,
    jobTitle: data.jobTitle,
    status: data.status ?? "applied",
    appliedDate: data.appliedDate ? new Date(data.appliedDate) : new Date(),
    jobType: data.jobType ?? "On-Site Full-Time",
    salary: data.salary ?? 25000,
    interviewStatus: data.interviewStatus ?? "none",
    interviewAt: data.interviewAt ? new Date(data.interviewAt) : new Date(),
    interviewMethod: data.interviewMethod ?? "online",
    interviewNote: data.interviewNote ?? "",
    interviewRemarks: data.interviewRemarks ?? "",
  }), [data])
  
  const form = useForm<UpdateApplicationFormValues>({
    resolver: zodResolver(UpdateApplicationFormSchema),
    defaultValues
})

  const statusItems = React.useMemo(
    () => statuses.map(s => <SelectItem key={s} value={s}>{capitalize(s)}</SelectItem>),
    []
  )
  const jobTypeItems = React.useMemo(
    () => jobTypes.map(s => <SelectItem key={s} value={s}>{capitalize(s)}</SelectItem>),
    []
  )
  const interviewStatusItems = React.useMemo(
    () => InterviewStatus.map(s => <SelectItem key={s} value={s}>{capitalize(s)}</SelectItem>),
    []
  )
  const interviewMethodItems = React.useMemo(
    () => methodsOfInterview.map(s => <SelectItem key={s} value={s}>{capitalize(s)}</SelectItem>),
    []
  )


  const onSubmit = useCallback(async(values: UpdateApplicationFormValues) => {
    if (!data?._id) return
    try {
      await toastPromise(
        async () => {
          await run({
            appData: { id: data._id, data: values },
            timelineData: {
              field: "applied",
              oldDate: data.appliedDate,
              newDate: values.appliedDate.toISOString(),
            },
          })
          // all invalidations after flow completes
          queryClient.invalidateQueries({ queryKey: ["scheduled-interviews"] });
          queryClient.invalidateQueries({ queryKey: ["scheduled-interview-stats"] });
          queryClient.invalidateQueries({ queryKey: ["completed-interviews"] });
          queryClient.invalidateQueries({ queryKey: ["job-applications-applied"] });
          queryClient.invalidateQueries({ queryKey: ["dashboard-job-applications-stats"] });
          queryClient.invalidateQueries({ queryKey: ["job-applications"] });
        },
        {
          loading: "Updating application...",
          success: "Application updated successfully!",
          error: "Failed to update application.",
        }
      );
    } catch (err) {
      console.error("Flow failed:", err);
    }
  }, [data?._id, data.appliedDate,queryClient, run])


  const isPending = updateApplication.isPending || patchTimeline.isPending
  
  return (
        <main className="flex-1 p-6 md:p-8 space-y-8 mt-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">Edit Application</h1>
            <p className="text-muted-foreground">Update details for this job application</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Application Details */}
            <section className="space-y-4 p-6 rounded-xl border bg-card shadow-sm">
              <h3 className="font-semibold text-lg">Application Details</h3>

              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <CustomTooltip message='You can’t change the status here. Use the table actions to update it according to the application flow.'>

                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusItems}
                        </SelectContent>
                      </Select>
                    </CustomTooltip>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
              control={form.control}
              name="appliedDate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Date Applied</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          
                          >
                            {field.value ? format(field.value, "MMMM d, yyyy") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar mode="single" selected={field.value} onSelect={field.onChange}/>
                      </PopoverContent>
                    </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
                control={form.control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select Job Type" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {jobTypeItems}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Salary</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>

            {/* Interview Details */}
            <section className="space-y-4 p-6 rounded-xl border bg-card shadow-sm">
              <h3 className="font-semibold text-lg">Interview Details</h3>

              <FormField
                control={form.control}
                name="interviewStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Status</FormLabel>
                    <CustomTooltip message="To keep the application flow consistent, status can only be updated in the Interviews panel." >
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {interviewStatusItems}
                        </SelectContent>
                      </Select>
                    </CustomTooltip>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="interviewAt"
                render={({ field }) => (
                  <CustomTooltip message='You can’t change the status here. Use the table actions in Applications or Interviews panel to update it according to the application flow.'>
                    <DateTimePickerField
                      label="Interview Schedule"
                      value={field.value}
                      onChange={field.onChange}
                      disabled
                    />
                  </CustomTooltip>
                )}
              />

              <FormField
                control={form.control}
                name="interviewMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interview Method</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select Method" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {interviewMethodItems}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interviewNote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add interview notes (onsite address, online link, etc.)"
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interviewRemarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add interviewer’s feedback, remarks, or follow-up details..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          </div>

          <div className="flex justify-end gap-2">
            <BackButton data={data} isPending={isPending}/>
            <Button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 text-sidebar-primary-foreground"
              disabled={isPending}
              >
              {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Savings...
              </>
            ) : (
              "Save Changes"
            )}
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}

export default EditJobApplicationForm