"use client"

import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
} from "@/components/ui/form"
import { InterviewDateFormValues, interviewDateFormSchema } from "@/lib/form/validations/input-schema"
import { handleReschedInterviewInputSubmit } from "@/lib/form/actions/input-submit"
import { ActionDialogProps } from "../modals/ActionDialog"
import { DateTimePickerField } from "./fields/DateTimePicker"
import { JobApplicationType } from "@/types"
import z from "zod"
import useUpdateScheduledInterviewNotes from "@/lib/hooks/interviews/use-scheduled-interview-notes"
import { toast } from "sonner"
import useScheduledInterviewReschedule from "@/lib/hooks/interviews/use-scheduledinterview-reschedule"
import { toastPromise } from "../toastPromise"
import { addMinutes } from "date-fns"

type thisComponentProps = Omit<ActionDialogProps, 'children' | 'title'> & {
  data: Pick<JobApplicationType, "interviewAt"> // Only need interviewAt for rescheduling
  onSubmit: () => void
}

type RescheduleHandlerParams = {
  values: z.infer<typeof FormSchema>
  id: string
  mutation: ReturnType<typeof useScheduledInterviewReschedule>
  form: UseFormReturn<z.infer<typeof FormSchema>>
  onSuccessCallback?: () => void
}

const now = new Date()
now.setHours(0, 0, 0, 0)

const FormSchema = z.object({
  interviewAt: z.date().refine((date) => date > new Date(), {
    message: "Interview date must be a future date", // Ensure future
  }),
})


export function RescheduleInterviewForm({data, onSubmit}: thisComponentProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interviewAt: data.interviewAt ? new Date(data.interviewAt) : addMinutes(new Date(), 30), // Default to 30 minutes from now if no date provided
    },
  })

  const mutation = useScheduledInterviewReschedule()

const handleRescheduleInterviewSubmit = async ({
  values,
  id,
  mutation,
  form,
  onSuccessCallback,
}: RescheduleHandlerParams) => {
  const result = await toastPromise(
    () =>
      mutation.mutateAsync({
        id,
        interviewAt: values.interviewAt.toISOString(),
      }),
    {
      loading: "Rescheduling interview...",
      success: "Interview rescheduled successfully.",
      error: "Failed to reschedule interview",
    }
  )

  if (result) {
    form.reset()
    onSuccessCallback?.()
  }
}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(
        (values: { interviewAt: Date }) =>
          handleRescheduleInterviewSubmit({
            values,
            id: data._id,
            mutation,
            form,
            onSuccessCallback: onSubmit,
          }),
          (errors) => {
            console.log("Validation errors:", errors)
          }
      )} className="space-y-6">
              {/* Company */}
              <FormField
                control={form.control}
                name="interviewAt"
                render={({ field }) => (
                  <DateTimePickerField
                    data={data.interviewAt}
                    label="Interview Schedule"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

          {/* Submit button */}
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onSubmit()}>Cancel</Button>
            <Button type="submit" className="bg-brand-blue text-white hover:bg-brand-blue/80">
              Submit
            </Button>
          </div>
      </form>
    </Form>
  )
}
