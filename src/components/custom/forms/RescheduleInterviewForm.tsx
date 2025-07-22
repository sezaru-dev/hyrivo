"use client"

import { useForm } from "react-hook-form"
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

type thisComponentProps = Omit<ActionDialogProps, 'children' | 'title'> & {
  onSubmit: () => void
}

export function RescheduleInterviewForm({data, onSubmit}: thisComponentProps) {
  const form = useForm<InterviewDateFormValues>({
    resolver: zodResolver(interviewDateFormSchema),
    defaultValues: {
      interviewAt: new Date(),
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit( async (values) => {
        await handleReschedInterviewInputSubmit(values)
        onSubmit() // ✅ Only runs when valid
      },
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
