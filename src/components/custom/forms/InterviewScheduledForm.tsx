import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { InterviewDetailsFormSchema, methodsOfInterview } from "@/lib/form/validations/input-schema"
import { DateTimePickerField } from "./fields/DateTimePicker"
import { capitalize } from "@/utils/capitalize"
import { Textarea } from "@/components/ui/textarea"
import useSetInterviewSchedule from "@/lib/hooks/applied/use-set-interview"
import z from "zod"
import { JobApplicationType } from "@/types"

type ThisComponentProps = {
  data: Pick<JobApplicationType, '_id' | 'appliedDate'>,
  closeDialog: () => void 
}

export function InterviewScheduledForm({data, closeDialog}:ThisComponentProps) {

const schema = InterviewDetailsFormSchema(data);

type InterviewDetailsFormValues = z.infer<typeof schema>;

  const form = useForm<InterviewDetailsFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      interviewAt: undefined,
      interviewMethod: "online",
      interviewNote: ""
    },
  })

  console.log(data)

  const {mutate, isPending, isSuccess} = useSetInterviewSchedule()

  // Handle form submit
  const onSubmit = async (values: InterviewDetailsFormValues) => {
    try {
     mutate({ id: data._id, data: {
        interviewAt: values.interviewAt.toISOString(),
        interviewMethod: values.interviewMethod,
        interviewNote: values.interviewNote ?? null, // convert undefined → null
    }});
    closeDialog()
  } catch (err) {
    console.error("Failed to set interview:", err);
  }
  }



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 md:grid-cols-2">
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

        <FormField
          control={form.control}
          name="interviewMethod"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 md:col-span-2">
              <FormLabel>Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {methodsOfInterview.map((s) => (
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

        <FormField
          control={form.control}
          name="interviewNote"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Notes (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add onsite address, online interview link, any notes or details about the interview..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="flex justify-end pt-4 md:col-span-2">
          <Button type="submit" className="w-full bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                loading...
              </>
            ) : isSuccess ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                loading...
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
