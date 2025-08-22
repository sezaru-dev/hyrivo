"use client"

import { useForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
} from "@/components/ui/form"
import { ActionDialogProps } from "../modals/ActionDialog"
import { DateTimePickerField } from "./fields/DateTimePicker"
import { JobApplicationType } from "@/types"
import z from "zod"
import useScheduledInterviewReschedule from "@/lib/hooks/interviews/use-scheduledinterview-reschedule"
import { toastPromise } from "../toastPromise"
import { addMinutes } from "date-fns"

type thisComponentProps = Omit<ActionDialogProps, 'children' | 'title' | 'form'> & {
  data: JobApplicationType
  onSubmit: () => void
}

type RescheduleHandlerParams = {
  values: z.infer<typeof FormSchema>
  id: string
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

  const {mutateAsync, isPending, isSuccess} = useScheduledInterviewReschedule()

  const handleRescheduleInterviewSubmit = async ({
    values,
    id,
    form,
    onSuccessCallback,
  }: RescheduleHandlerParams) => {
    
    try {
      await mutateAsync({
        id,
        interviewAt: values.interviewAt.toISOString(),
      })

      // only run if mutation succeeds
      form.reset()
      onSuccessCallback?.()
    } catch (error) {
      // no need to handle toast here, since toastPromise is already inside the hook
      console.error("Reschedule failed:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(
        (values: { interviewAt: Date }) =>
          handleRescheduleInterviewSubmit({
            values,
            id: data._id,
            form,
            onSuccessCallback: onSubmit,
          })
      )} className="space-y-6">
              {/* Company */}
              <FormField
                control={form.control}
                name="interviewAt"
                render={({ field }) => (
                  <DateTimePickerField
                    data={data}
                    label="Interview Schedule"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

          {/* Submit button */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              disabled={isPending || isSuccess}
              onClick={() => {
                form.reset()
                  onSubmit() // only close dialog here
                }}
              >
              Cancel
            </Button>
            <Button 
              type="submit" 
               disabled={isPending || isSuccess}
              className="bg-brand-blue text-white hover:bg-brand-blue/80">
              Submit
            </Button>
          </div>
      </form>
    </Form>
  )
}
