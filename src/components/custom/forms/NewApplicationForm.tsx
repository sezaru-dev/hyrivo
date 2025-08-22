import { CalendarIcon, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

import { jobTypes, NewApplicationFormSchema, NewApplicationFormValues } from "@/lib/form/validations/input-schema"
import { useModalStore } from "@/stores/features/useModalStore"

// 🔹 Import the flow instead of old hook
import { useCreateApplicationFlow } from "@/lib/hooks/applied/use-create-application-flow"
import { toastPromise } from "../toastPromise"
import { useQueryClient } from "@tanstack/react-query"

export function NewApplicationForm() {
  const closeModal = useModalStore.getState().closeNewAppModal;
  const queryClient = useQueryClient(); // ← add this
  
  // Get the flow hook
  const { run, createApplication, createTimeline, patchTimeline, } = useCreateApplicationFlow()
  
  const form = useForm<NewApplicationFormValues>({
    resolver: zodResolver(NewApplicationFormSchema),
    defaultValues: {
      companyName: "",
      jobTitle: "",
      appliedDate: new Date(),
      jobType: "On-Site Full-Time",
      salary: 25000,
    },
  })

  // Handle form submit
  const onSubmit = async (values: NewApplicationFormValues) => {
    try {
    await toastPromise(
      async () => {
        await run(values); // runs timeline + application + patch
        // all invalidations after flow completes
        queryClient.invalidateQueries({ queryKey: ["timeline"] });
        queryClient.invalidateQueries({ queryKey: ["job-applications-applied"] });
        queryClient.invalidateQueries({ queryKey: ["job-applications-stats"] });
      },
      {
        loading: "Adding application...",
        success: "Application added successfully!",
        error: "Failed to add application.",
      }
    );
    closeModal(); // close dialog after everything
  } catch (err) {
    console.error("Flow failed:", err);
  }
  }

  // Combine loading states (timeline/app creation/patching)
  const isPending = createTimeline.isPending || createApplication.isPending || patchTimeline.isPending
  const isSuccess = createTimeline.isSuccess || createApplication.isSuccess || patchTimeline.isSuccess

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
        {/* Company */}
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

        {/* Job Title */}
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

        {/* Date Applied */}
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
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Job Type */}
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
                  {jobTypes.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
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
            <FormItem className="md:col-span-2">
              <FormLabel>Monthly Salary</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="flex justify-end pt-4 md:col-span-2">
          <Button 
            type="submit"
            className="w-full bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80"
            disabled={isPending || isSuccess}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : isSuccess ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
