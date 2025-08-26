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
import { Textarea } from "@/components/ui/textarea"
import { ActionDialogProps } from "../modals/ActionDialog"
import useUpdateScheduledInterviewNotes from "@/lib/hooks/interviews/use-scheduled-interview-notes"
import { JobApplicationType } from "@/types"
import z from "zod"

type NotesFormProps = Omit<ActionDialogProps, 'children' | 'title' | 'form'> & {
  data:JobApplicationType
  onSubmit?: () => void
}

type SubmitHandlerParams = {
  values: z.infer<typeof FormSchema>
}

const FormSchema = z.object({
  interviewNote: z
  .string()
  .optional()
  .refine((val) => !val || (val.length >= 10 && val.length <= 200), {
    message: "Notes must be between 10 and 200 characters if provided",
  }),
})

export default function NotesForm({data, onSubmit}: NotesFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interviewNote: data?.interviewNote? data.interviewNote : "",
    },
  })

  const {mutateAsync, isPending, isSuccess} = useUpdateScheduledInterviewNotes()

  const handleSubmitNote = async ({values}:SubmitHandlerParams) => {
    try {
      await mutateAsync({
        id: data._id,
        data: { interviewNote: values.interviewNote ?? null },
      })

      // only run if mutation succeeds
      form.reset()
      onSubmit?.()
    } catch (error) {
      console.error("Reschedule failed:", error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(
        (values: z.infer<typeof FormSchema>) =>
          handleSubmitNote({
          values,
        })
        )} className="space-y-6">
          {/* Company */}
          <FormField
            control={form.control}
            name="interviewNote"
            render={({ field }) => {
              const currentLength = field.value?.length ?? 0
              const maxLength = 200
              return (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={!data?.interviewNote ? "Add interview notes (onsite address, online link, etc.)" : ""}
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  {/* Error + Counter row */}
                    <div className="grid grid-cols-12 mt-1 text-xs">
                      <FormMessage className="col-span-11"/>
                        <span
                          className={`col-start-12 col-span-1 ${
                            currentLength > maxLength - 20 ? "text-red-500" : "text-muted-foreground"
                          }`}
                        >
                          {currentLength}/{maxLength}
                        </span>
                    </div>
                </FormItem>
              )
            }}
          />

      {/* Submit button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" className='bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80' disabled={isPending || isSuccess}>
          Save
        </Button>
      </div>
</form>

    </Form>
  )
}
