"use client"

import * as React from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type ThisComponentProps = {
  children: React.ReactNode
}

export function ViewDetailsDialog({children}:ThisComponentProps) {
  const [open, setOpen] = React.useState(false)

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Full Stack Developer</DialogTitle>
            <DialogDescription>
              DevSolutions Inc.
            </DialogDescription>
            <DialogDescription className="flex gap-6 items-center justify-center sm:justify-start">
              <Badge variant="outline" className="text-blue-500">Full-Time Remote</Badge>
              <p className="text-sm">&#8369;45,000</p>
            </DialogDescription>
          </DialogHeader>

          <Separator className="my-2"/>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex justify-between">
              <article>
                  <h4 className="text-muted-foreground text-sm">Application Date</h4>
                  <p className="text-primary">Jul 15, 2025</p>
              </article>
              <article className="grid grid-cols-1 place-items-end">
                  <h4 className="text-muted-foreground text-sm">Application Status</h4>
                  <Badge variant="outline" className="text-blue-500 w-min">Interview</Badge>
              </article>
            </div>
            <div className="flex justify-between">
              <article>
                  <h4 className="text-muted-foreground text-sm">Interview</h4>
                  <p className="text-primary">Jul 22, 2025 2:00 PM</p>
              </article>
              <article className="grid grid-cols-1 place-items-end">
                  <h4 className="text-muted-foreground text-sm">Interview Status</h4>
                  <Badge variant="outline" className="text-blue-500 w-min">Completed</Badge>
              </article>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }