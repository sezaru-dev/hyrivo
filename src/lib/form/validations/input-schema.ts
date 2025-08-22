import { z } from "zod"
export const statuses = [
  "applied",
  "interview",
  "offered",
] as const;
export const jobTypes = [
  "On-Site Full-Time",
  "Full-Time Remote",
  "Hybrid",
  "Contract",
  "Internship",
  "Remote Contract",
] as const;
export const methodsOfInterview = [
  "phone",
  "online",
  "onsite",
] as const;
const now = new Date()
now.setHours(0, 0, 0, 0)

//unused
export const NewApplicationFormSchema = z.object({
  companyName: z.string().min(1, {
    message: "Required",
  }),
  jobTitle: z.string().min(1, {
    message: "Required",
  }),
  appliedDate: z.date({
    required_error: "A date of application is required.",
  }),
  jobType: z.enum(jobTypes),
  salary: z.coerce.number({
    required_error: "Salary is required",
    invalid_type_error: "Salary must be a number",
  }).min(1000, "Salary must be at least 4 digits (e.g. 1000)")
})

export const InterviewDetailsFormSchema = z.object({
  interviewAt: z.date().refine(
    (date) => date >= now,
    {
      message: "Interview date cannot be in the past",
    }
  ),
  interviewMethod: z.enum(methodsOfInterview),
interviewNote: z
  .string()
  .optional()
  .refine((val) => !val || (val.length >= 10 && val.length <= 200), {
    message: "Notes must be between 10 and 200 characters if provided",
  }),

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


export const interviewDateFormSchema = z.object({
  interviewAt: z.date().refine(
    (date) => date >= now,
    {
      message: "Interview date cannot be in the past",
    }
  ),
})

export const signupFormSchema = z.object({
  name: z.string().min(2, { 
    message: "Name must be at least 2 characters." 
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
password: z
  .string()
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/,
    {
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    }
  ),
})

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export type NewApplicationFormValues = z.infer<typeof NewApplicationFormSchema>
export type InterviewDetailsFormValues = z.infer<typeof InterviewDetailsFormSchema>
export type RemarksFormValues = z.infer<typeof remarksFormSchema>
export type InterviewDateFormValues = z.infer<typeof interviewDateFormSchema>
export type SignupFormValues = z.infer<typeof signupFormSchema>
export type LoginFormValues = z.infer<typeof LoginFormSchema>
