import React from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type TooltipProps = {
  message: string
  children: React.ReactNode
}

const CustomTooltip = ({message, children}:TooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="cursor-not-allowed w-full">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{message}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default CustomTooltip