import { SignupFormValues } from "@/lib/form/validations/input-schema";
import { fetcher } from "../fetcher";

export const signupUser = (data: SignupFormValues) =>
  fetcher("/api/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });