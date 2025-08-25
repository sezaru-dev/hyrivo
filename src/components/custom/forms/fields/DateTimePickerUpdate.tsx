"use client"

import React, { useEffect, useState } from "react"
import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { JobApplicationType } from "@/types"

type Props = {
  data?: Pick<JobApplicationType, "interviewAt">
  label: string
  value?: Date // full datetime from RHF form
  onChange: (date: Date | undefined) => void
  disabled?: boolean
}

export function DateTimePickerField({ label, value, onChange, disabled }: Props) {
  const [open, setOpen] = useState(false)

  // Initialize once from value
  const [dateOnly, setDateOnly] = useState<Date | undefined>(() => value)
  const [time, setTime] = useState(() => {
    if (value) {
      const hours = value.getHours().toString().padStart(2, "0")
      const minutes = value.getMinutes().toString().padStart(2, "0")
      return `${hours}:${minutes}`
    }
    return "09:00"
  })

  // Only update RHF on local changes (user action)
  useEffect(() => {
    if (!dateOnly) return
    const [hours, minutes] = time.split(":").map(Number)
    const newDate = new Date(dateOnly)
    newDate.setHours(hours, minutes, 0, 0)
    if (value?.toISOString() !== newDate.toISOString()) {
      onChange(newDate)
    }
    // Don't include `value` in dependencies → avoids loop
  }, [dateOnly, time, onChange])

  return (
    <FormItem className="space-y-2 w-full md:col-span-2">
      <FormLabel>{label}</FormLabel>

      <div className="flex flex-col sm:flex-row gap-4 col-span-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button variant="outline" className="w-full sm:w-40 justify-between font-normal" disabled={disabled}>
                {dateOnly ? dateOnly.toLocaleDateString() : "Select date"}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={dateOnly}
              captionLayout="dropdown"
              onSelect={(date) => {
                setDateOnly(date)
                setOpen(false)
              }}
              disabled={disabled}
            />
          </PopoverContent>
        </Popover>

        <Input
          type="time"
          step="60"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full sm:w-32"
          disabled={disabled}
        />
      </div>

      <FormMessage />
    </FormItem>
  )
}

