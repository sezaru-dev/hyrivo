"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // Prevents hydration mismatch

  const isDark = theme === "dark"

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all ${isDark ? "scale-0 rotate-90 absolute" : "scale-100 rotate-0"}`}
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all absolute ${isDark ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
