'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LoginForm } from "../forms/LoginForm"
import { SignupForm } from "../forms/SignupForm"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { DialogDescription } from '@radix-ui/react-dialog'

type LoginSignupDialogProps = {
  triggerType: "login" | "signup",
  children: React.ReactNode
}

const LoginSignupDialog = ({triggerType,children}: LoginSignupDialogProps) => {
  const [formType, setFormType] = useState<"login" | "signup">(triggerType)
  return (
    <Dialog onOpenChange={() => setFormType(triggerType)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md bg-neutral-950 border border-neutral-800">
        <VisuallyHidden>
          <DialogTitle>
            {formType === "login" ? "Login to your account" : "Create a new account"}
          </DialogTitle>
          <DialogDescription>
            {formType === "login"
              ? "Enter your credentials to access your account."
              : "Fill out the form to create a new account."}
          </DialogDescription>
        </VisuallyHidden>
        {formType === "login" ? (
          <>
            <LoginForm />
            <p className="text-sm text-center mt-4 text-neutral-100">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => setFormType("signup")}
                className="underline text-blue-600 hover:text-blue-800"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignupForm />
            <p className="text-sm text-center mt-4 text-neutral-100">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setFormType("login")}
                className="underline text-blue-600 hover:text-blue-800"
              >
                Login
              </button>
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default LoginSignupDialog