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
import LoginWithGithubButton from "../buttons/LoginWithGithubButton"
import { LoginFormSchema } from "@/lib/form/validations/input-schema"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { toastPromise } from "../toastPromise"
import { useRouter } from "next/navigation"


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof LoginFormSchema>>({
      resolver: zodResolver(LoginFormSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    })
  const router = useRouter()
  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    await toastPromise(async () => {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (!res?.ok) throw new Error("Invalid credentials")
      // redirect after success
      router.push("/dashboard")

      return "Successfully logged in!"
    }, {
      loading: "Signing in...",
      success: () => <span className="text-green-500">Signed in successfully!</span>,
      error: (err) => <span className="text-red-500">{(err as Error).message}</span>
    })
  }

  const isPending = form.formState.isSubmitting

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Login to your Hyrivo account
          </p>
        </div>

        <div className="grid gap-6">

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-3">
                <div className="flex items-center">
                  <FormLabel>Password</FormLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <Button
           type="submit" 
           disabled={isPending}
           className="w-full h-9 px-4 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-800 text-white">
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Signing in...
              </>
            ) : "Login"
}
          </Button>
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or
            </span>
          </div>
          <LoginWithGithubButton/>
        </div>
      </form>
    </Form>
  )
}
