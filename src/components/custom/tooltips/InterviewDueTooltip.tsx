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
          <p className='max-w-xs'>
          Interview has passed. Update status by marking as <strong>Completed</strong> or <strong>Missed</strong>.
        </p>

        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default InterviewDueTooltip