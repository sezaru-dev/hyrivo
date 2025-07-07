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
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaGoogle } from "react-icons/fa";
import Link from "next/link"
import PasswordEyeButton from "../buttons/PasswordEyeButton"
import { useState } from "react"

const FormSchema = z.object({
  name: z.string().min(2, { 
    message: "Name must be at least 2 characters." 
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    })
  
    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast("You submitted the following values", {
        description: (
          <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }


  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your Hyrivo account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Track your job applications effortlessly
          </p>
        </div>

        <div className="grid gap-6">

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel>Fullname</FormLabel>
                <div className="space-y-1">
                  <FormControl>
                    <Input type="text" {...field} />
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
                <FormLabel>Email</FormLabel>
                <div className="space-y-1">
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Password</FormLabel>
                </div>
                <div className="space-y-1">
                  <div className="relative">
                    <FormControl>
                      <Input {...field} type={showPassword ? "text" : "password"}/>
                    </FormControl>
                    <PasswordEyeButton show={showPassword} onToggle={() => setShowPassword(prev => !prev)}/>
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />


          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <Button variant="outline" className="w-full" type="button">
            <FaGoogle/>
            Continue with Google
          </Button>
        </div>

        
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href='/login' className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  )
}
