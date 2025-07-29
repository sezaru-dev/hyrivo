import { z } from "zod"
export const statuses = [
  "Applied",
  "Interview",
  "Offered",
] as const;
export const jobTypes = [
  "On-Site Full-Time",
  "Full-Time Remote",
  "Hybrid",
  "Contract",
  "Internship",
  "Remote Contract",
] as const;

export const inputFormSchema = z.object({
  status: z.enum(statuses),
  companyName: z.string().min(1, {
    message: "Required",
  }),
  jobTitle: z.string().min(1, {
    message: "Required",
  }),
  appliedDate: z.date({
    required_error: "A date of application is required.",
  }),
  interviewAt: z.date().optional(),
  jobType: z.enum(jobTypes),
  salary: z.coerce.number({
    required_error: "Salary is required",
    invalid_type_error: "Salary must be a number",
  }).min(1000, "Salary must be at least 4 digits (e.g. 1000)")
}).superRefine((data, ctx) => {
  if (
    (data.status === "Interview" || data.status === "Offered") &&
    !data.interviewAt
  ) {
    ctx.addIssue({
      path: ["interviewAt"],
      code: "custom",
      message: "Interview date is required when status is 'Interview' or 'Offered'",
    });
  }
})

export const remarksFormSchema = z.object({
  remarks: z
    .string()
    .min(10, {
      message: "Remarks must be at least 10 characters.",
    })
    .max(200, {
      message: "Remarks must not be longer than 200 characters.",
    }),
})
export const notesFormSchema = z.object({
  remarks: z
    .string()
    .min(10, {
      message: "Notes must be at least 10 characters.",
    })
    .max(200, {
      message: "Notes must not be longer than 200 characters.",
    }),
})


const now = new Date()
now.setHours(0, 0, 0, 0)
export const interviewDateFormSchema = z.object({
  interviewAt: z.date().refine(
    (date) => date >= now,
    {
      message: "Interview date cannot be in the past",
    }
  ),
})

export type InputFormValues = z.infer<typeof inputFormSchema>
export type RemarksFormValues = z.infer<typeof remarksFormSchema>
export type NotesFormValues = z.infer<typeof notesFormSchema>
export type InterviewDateFormValues = z.infer<typeof interviewDateFormSchema>
