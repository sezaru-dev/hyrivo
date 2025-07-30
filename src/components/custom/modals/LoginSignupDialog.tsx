'use client'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { LoginForm } from "../forms/LoginForm"
import { SignupForm } from "../forms/SignupForm"

type LoginSignupDialogProps = {
  triggerType: "login" | "signup",
  children: React.ReactNode
}

const LoginSignupDialog = ({triggerType,children}: LoginSignupDialogProps) => {
  const [formType, setFormType] = useState<"login" | "signup">(triggerType)
  return (
    <Dialog onOpenChange={() => setFormType(triggerType)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        {formType === "login" ? (
          <>
            <LoginForm />
            <p className="text-sm text-center mt-4">
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
            <p className="text-sm text-center mt-4">
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