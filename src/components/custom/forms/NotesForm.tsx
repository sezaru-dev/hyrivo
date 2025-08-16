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
  FormDescription,
} from "@/components/ui/form"

import { Textarea } from "@/components/ui/textarea"
import { ActionDialogProps } from "../modals/ActionDialog"
import useUpdateScheduledInterviewNotes from "@/lib/hooks/interviews/use-scheduled-interview-notes"
import { toast } from "sonner"
import { JobApplicationType } from "@/types"
import z from "zod"

type NotesFormProps = Omit<ActionDialogProps, 'children' | 'title' | 'form'> & {
  data:JobApplicationType
  onSubmit?: () => void
}

const FormSchema = z.object({
  interviewNote: z
    .string()
    .min(10, {
      message: "Notes must be at least 10 characters.",
    })
    .max(200, {
      message: "Notes must not be longer than 200 characters.",
    }),
})

export default function NotesForm({data, onSubmit}: NotesFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interviewNote: data?.interviewNote? data.interviewNote : "",
    },
  })

  const mutation = useUpdateScheduledInterviewNotes()

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(
          async (values) => {
             toast.promise(
              mutation.mutateAsync({
                id: data._id,
                data: { interviewNote: values.interviewNote },
              }),
              {
                loading: <span>Saving note...</span>,
                success: () => {
                  form.reset()
                  onSubmit?.()
                  return <span className="text-green-500">Note saved successfully</span>
                },
                error: (err: unknown) => {
                  if (err instanceof Error) {
                    return <span className="text-red-500">{err.message}</span>
                  }
                  return <span className="text-red-500">Something went wrong</span>
                }
              }
            )
          },
          (errors) => {
            console.log("Validation errors:", errors)
          }
        )} className="space-y-6">
          {/* Company */}
          <FormField
            control={form.control}
            name="interviewNote"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    defaultValue={data?.interviewNote ?? ""}
                    placeholder={!data?.interviewNote ? "Add any notes or details about the scheduled interview..." : ""}
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

      {/* Submit button */}
      <div className="flex justify-end pt-4">
        <Button type="submit" className='bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80'>Submit</Button>
      </div>
</form>

    </Form>
  )
}
