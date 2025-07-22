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

type Props = {
  label: string
  value?: Date
  onChange: (date: Date | undefined) => void
}

export function DateTimePickerField({ label, value, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [dateOnly, setDateOnly] = useState<Date | undefined>(value)
  const [time, setTime] = useState("09:00")

  useEffect(() => {
    if (dateOnly && time) {
      const [hours, minutes] = time.split(":").map(Number)
      const newDate = new Date(dateOnly)
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      newDate.setSeconds(0)
      onChange(newDate)
    }
  }, [dateOnly, time])

  return (
    <FormItem className="space-y-2">
      <FormLabel>{label}</FormLabel>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Date Picker */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant="outline"
                className="w-full sm:w-40 justify-between font-normal"
              >
                {dateOnly ? dateOnly.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
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
            />
          </PopoverContent>
        </Popover>

        {/* Time Picker */}
        <Input
          type="time"
          step="60"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full sm:w-32"
        />
      </div>

    <FormMessage />
</FormItem>

  )
}
