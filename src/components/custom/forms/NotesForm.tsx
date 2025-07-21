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

import { Input } from "@/components/ui/input"
import { notesFormSchema, NotesFormValues } from "@/lib/form/validations/input-schema"
import { handleRemarksInputSubmit } from "@/lib/form/actions/input-submit"
import { Textarea } from "@/components/ui/textarea"
import { ActionDialogProps } from "../modals/ActionDialog"

type NotesFormProps = Omit<ActionDialogProps, 'children' | 'title'> & {
  onSubmit: () => void
}

export function NotesForm({data, onSubmit}: NotesFormProps) {
  const form = useForm<NotesFormValues>({
    resolver: zodResolver(notesFormSchema),
    defaultValues: {
      remarks: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit( async (values) => {
        await handleRemarksInputSubmit(values)
      onSubmit() // ✅ Only runs when valid
    },
    (errors) => {
      console.log("Validation errors:", errors)
    }
  )} className="space-y-6">
          {/* Company */}
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    defaultValue={data || ""}
                    placeholder={!data ? "Why was this archived or rejected?" : ""}
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
