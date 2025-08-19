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
import { toast } from "sonner"
import { JobApplicationType } from "@/types"
import z from "zod"
import useUpdateCompletedInterviewRemarks from "@/lib/hooks/interviews/completed/use-scheduled-interview-remarks"
import { useCallback } from "react"
import { useFocusEnd } from "@/hooks/useFocusEnd"

type NotesFormProps = Omit<ActionDialogProps, 'children' | 'title' | 'form'> & {
  data:JobApplicationType
  onSubmit?: () => void
}

const FormSchema = z.object({
  interviewRemarks: z
    .string()
    .min(10, {
      message: "Remarks must be at least 10 characters.",
    })
    .max(200, {
      message: "Remarks must not be longer than 200 characters.",
    }),
})

export default function InterviewRemarksForm({data, onSubmit}: NotesFormProps) {
  const textareaRef = useFocusEnd<HTMLTextAreaElement>(true)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      interviewRemarks: data?.interviewRemarks?.trim() || "",
    },
  })

  const mutation = useUpdateCompletedInterviewRemarks()

  

  console.log(data);

  const handleSubmitForm = useCallback(
  async (values: z.infer<typeof FormSchema>) => {
    if (!data?._id) return;
    toast.promise(
      mutation.mutateAsync({
        id: data._id,
        data: { interviewRemarks: values.interviewRemarks },
      }),
      {
        loading: <span>Saving remarks...</span>,
        success: () => {
          form.reset();
          onSubmit?.();
          return <span className="text-green-500">Remarks saved successfully</span>;
        },
        error: (err: unknown) => {
          if (err instanceof Error) {
            return <span className="text-red-500">{err.message}</span>;
          }
          return <span className="text-red-500">Something went wrong</span>;
        },
      }
    );
  },
  [data?._id, mutation, form, onSubmit]
);

  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className="space-y-6">
          {/* Company */}
          <FormField
            control={form.control}
            name="interviewRemarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    ref={(e) => {
                      field.ref(e)       // keep RHF ref
                      textareaRef.current = e // keep your custom ref
                    }}
                    placeholder={!data?.interviewRemarks ? "Add any remarks..." : ""}
                    className="resize-none"
                    rows={4}
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
