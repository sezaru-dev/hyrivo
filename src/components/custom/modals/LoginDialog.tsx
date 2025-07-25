'use client'

import { useState } from "react"
import { signIn } from "next-auth/react"
import { FaGoogle, FaGithub } from "react-icons/fa"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type LoginDialogProps = {
  children: React.ReactNode
}

export function LoginDialog({children}: LoginDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

/*   const handleSignIn = async (provider: "google" | "github") => {
    setIsLoading(true)
    try {
      await signIn(provider, { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Login error", error)
    } finally {
      setIsLoading(false)
    }
  } */

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>

      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl">Login to your account</DialogTitle>
          <DialogDescription>
            Use your social account to continue.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-4">
          <Button
            variant="outline"
            disabled={isLoading}
            className="w-full flex gap-2 items-center justify-center bg-[#4285F4] text-white hover:bg-[#357ae8]"
            >
            {/* onClick={() => handleSignIn("google")} */}
            <FaGoogle className="size-4" />
            {isLoading ? "Signing in..." : "Login with Google"}
          </Button>

          <Button
            variant="outline"
            disabled={isLoading}
            className="w-full flex gap-2 items-center justify-center bg-[#333] text-white hover:bg-[#24292F]"
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
            {/* onClick={() => handleSignIn("github")} */}
            <FaGithub className="size-4" />
            {isLoading ? "Signing in..." : "Login with GitHub"}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground mt-4">
          No signup required — your account will be created automatically.
        </div>
      </DialogContent>
    </Dialog>
  )
}
