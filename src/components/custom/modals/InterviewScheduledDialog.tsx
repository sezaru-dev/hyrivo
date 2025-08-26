"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InterviewScheduledForm } from "../forms/InterviewScheduledForm";
import React, { useState } from "react";
import { JobApplicationType } from "@/types";

export type InterviewScheduledDialogProps = {
  data: JobApplicationType
}
export default function InterviewScheduledDialog({data}: InterviewScheduledDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className=" justify-start px-2">Interview Scheduled</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Set Interview Schedule</DialogTitle>
        </DialogHeader>
        {/* form here */}
        <InterviewScheduledForm data={data} closeDialog={() => setIsOpen(false)}/>
      </DialogContent>
    </Dialog>
  );
}
