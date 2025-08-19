"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Input } from "@/components/ui/input"
import { inputFormSchema, InputFormValues, jobTypes, statuses } from "@/lib/form/validations/input-schema"
import { submitJobApplication } from "@/lib/form/actions/input-submit"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { DateTimePickerField } from "./fields/DateTimePicker"
import { useCreateJobApplication } from "@/lib/hooks/use-create-job-application"
import { capitalize } from "@/utils/capitalize"

/* type Props = {
  onSuccess?: () => void;
}; */

export function InputForm() {
  const form = useForm<InputFormValues>({
    resolver: zodResolver(inputFormSchema),
    defaultValues: {
      status: "applied",
      companyName: "",
      jobTitle: "",
      appliedDate: new Date(),
      interviewAt: undefined,
      jobType: "On-Site Full-Time",
      salary: 25000,
    },
  })

  const status = form.watch("status")
  const { mutateAsync: createJobApplication } = useCreateJobApplication()

  const onSubmit = (data: InputFormValues) => {
    submitJobApplication(data, createJobApplication, form.reset)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
  console.log("Validation errors:", errors)
})} className="space-y-6">
        {/* Full-width fields */}
        <div className="space-y-4">
          {/* Company */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Job Title */}
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Applied Date */}
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
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "MMMM d, yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statuses.map((s) => (
                      <SelectItem key={s} value={s}>
                        {capitalize(s)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Interview Schedule (conditionally rendered) */}
        {(status === "interview" || status === "offered") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="interviewAt"
              render={({ field }) => (
                <DateTimePickerField
                  label="Interview Schedule"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        )}

      {/* Job Type & Salary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Job Type */}
        <FormField
          control={form.control}
          name="jobType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {jobTypes.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Salary */}
        <FormField
          control={form.control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Salary</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Submit button */}
      <div className="flex justify-end pt-4">
        <Button type="submit"  className='bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80'>Submit</Button>
      </div>
</form>

    </Form>
  )
}
