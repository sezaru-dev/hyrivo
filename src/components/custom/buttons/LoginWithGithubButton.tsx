"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import React, { useState } from "react"
import { FaGithub } from "react-icons/fa"
import { Loader2 } from "lucide-react"

const LoginWithGithubButton = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("github", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Login error", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      disabled={isLoading}
      aria-busy={isLoading}
      className="w-full flex gap-2 items-center justify-center dark:bg-[#24292F] dark:text-white dark:hover:bg-[#24292F]/80"
      onClick={handleSignIn}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          Signing in...
        </>
      ) : (
        <>
          <FaGithub className="size-4" />
          Continue with GitHub
        </>
      )}
    </Button>
  )
}

export default LoginWithGithubButton
