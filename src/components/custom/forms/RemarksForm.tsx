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
import { remarksFormSchema, RemarksFormValues } from "@/lib/form/validations/input-schema"
import { handleRemarksInputSubmit } from "@/lib/form/actions/input-submit"
import { hasRemarkProps } from "../modals/EditRemarksModal"
import { Textarea } from "@/components/ui/textarea"

type RemarksFormProps = hasRemarkProps & {
  onSubmit: () => void
}

export function RemarksForm({hasRemark, onSubmit}: RemarksFormProps) {
  const form = useForm<RemarksFormValues>({
    resolver: zodResolver(remarksFormSchema),
    defaultValues: {
      remarks: "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleRemarksInputSubmit, (errors) => {
  console.log("Validation errors:", errors)
  onSubmit()
})} className="space-y-6">
          {/* Company */}
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Textarea
                    defaultValue={hasRemark || ""}
                    placeholder={!hasRemark ? "Why was this archived or rejected?" : ""}
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
