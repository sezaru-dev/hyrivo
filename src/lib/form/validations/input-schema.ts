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
  company: z.string().min(1, {
    message: "Required",
  }),
  jobTitle: z.string().min(1, {
    message: "Required",
  }),
  appliedDate: z.date({
    required_error: "A date of birth is required.",
  }),
  interviewAt: z.date().optional(),
  jobType: z.enum(jobTypes),
  salary: z.number({
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

export type InputFormValues = z.infer<typeof inputFormSchema>
