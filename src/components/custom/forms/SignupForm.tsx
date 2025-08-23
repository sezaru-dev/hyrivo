'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PasswordEyeButton from "../buttons/PasswordEyeButton"
import { useState } from "react"
import LoginWithGithubButton from "../buttons/LoginWithGithubButton"
import { signupFormSchema, SignupFormValues } from "@/lib/form/validations/input-schema"
import { useSignupUser } from "@/lib/hooks/use-signup-user"
import { useHandleSignupUser } from "@/lib/hooks/useHandleSignupUser"


export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof signupFormSchema>>({
      resolver: zodResolver(signupFormSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    })
  
  const { mutateAsync: signupUser } = useSignupUser()
  const handleSignupUser = useHandleSignupUser() // Use the custom hook

  const onSubmit = (data: SignupFormValues) => {
    handleSignupUser(data, signupUser, form.reset)
  }  

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-neutral-100">Create your account</h1>
          <p className="text-neutral-400 text-sm text-balance">
            Track your job applications effortlessly
          </p>
        </div>

        <div className="grid gap-6">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel className={cn(
                  "text-neutral-100",
                  form.formState.errors.name && "text-red-500"
                )}>Fullname</FormLabel>
                <div className="space-y-1">
                  <FormControl>
                    <Input type="text" {...field} autoComplete="name" className="auth-inputs text-neutral-50"/>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel className={cn(
                  "text-neutral-100",
                  form.formState.errors.email && "text-red-500"
                )}>Email</FormLabel>
                <div className="space-y-1">
                  <FormControl>
                    <Input {...field} autoComplete="email" className="auth-inputs text-neutral-50"/>
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <div className="flex items-center">
                  <FormLabel className={cn(
                  "text-neutral-100",
                  form.formState.errors.password && "text-red-500"
                )}>Password</FormLabel>
                </div>
                <div className="space-y-1">
                  <div className="relative">
                    <FormControl>
                      <Input {...field} type={showPassword ? "text" : "password"} autoComplete="new-password"  className="text-neutral-50"/>
                    </FormControl>
                    <PasswordEyeButton show={showPassword} onToggle={() => setShowPassword(prev => !prev)}/>
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-9 px-4 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800 text-white">
            Sign Up
          </Button>
          <div className="after:border-neutral-600 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-neutral-950 text-neutral-400 relative z-10 px-2">
              Or
            </span>
          </div>
          <LoginWithGithubButton/>
        </div>

      </form>
    </Form>
  )
}
