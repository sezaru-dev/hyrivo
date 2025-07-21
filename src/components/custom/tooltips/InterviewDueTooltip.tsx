import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type TooltipProps = {
  children: React.ReactNode
}

const InterviewDueTooltip = ({children}:TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>Interview is overdue</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default InterviewDueTooltip