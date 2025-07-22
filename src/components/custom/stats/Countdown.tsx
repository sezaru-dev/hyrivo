'use client'
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const scheduledDate = new Date("2025-07-22T14:00:00+08:00")

function getTimeDiff(target: Date) {
  const now = new Date()
  const diff = target.getTime() - now.getTime()

  if (diff <= 0) return null

  const totalMinutes = Math.floor(diff / (1000 * 60))
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  return { days, hours, minutes }
}

export function CountdownCard() {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number } | null>(null)

  useEffect(() => {
    const updateCountdown = () => {
      const diff = getTimeDiff(scheduledDate)
      setTimeLeft(diff)
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedTime = timeLeft
    ? [
        timeLeft.days > 0 ? `${timeLeft.days}d` : null,
        `${timeLeft.hours}h`,
        `${timeLeft.minutes}m`
      ]
        .filter(Boolean)
        .join(" ")
    : "No upcoming interviews"

  return (
    <Card className="w-full bg-muted/20">
      <CardContent className="p-6 flex items-start justify-between">
        <div className="flex flex-col justify-center">
          <h2 className="text-sm text-muted-foreground mb-2">Next interview in</h2>
          <p className="text-xl font-semibold text-primary">{formattedTime}</p>
          <span className="mt-1 text-sm text-muted-foreground">
            with <span className="font-medium text-foreground">DevSolutions Inc.</span>
          </span>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="mt-1 text-xs font-medium text-muted-foreground cursor-pointer">
              <MessageSquare className="w-4 h-4 text-green-500" />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            Zoom interview confirmed. Review system design. Join 10 mins early.
          </TooltipContent>
        </Tooltip>
      </CardContent>
    </Card>
  )
}
