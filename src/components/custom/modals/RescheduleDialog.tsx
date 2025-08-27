"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDropdownMenuStore } from "@/stores/features/dropdownMenuStore";
import { RescheduleInterviewForm } from "../forms/RescheduleInterviewForm";
import { JobApplicationType } from "@/types";

export type ActionDialogProps = {
  data: JobApplicationType
  children: React.ReactElement
  title: string
}

const RescheduleDialog = React.forwardRef<HTMLButtonElement, ActionDialogProps>(
  ({ data, children, title }, ref) => {
    
    const [open, setOpen] = useState(false);
    const setOpenDropdownId = useDropdownMenuStore(
      (state) => state.setOpenDropdownId
    );
     const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setOpenDropdownId(null); //  Close dropdown when dialog closes
      }
    };
  
    const onSubmit = () => {
      setOpen(false);
      setOpenDropdownId(null); 
      // Also close dropdown when form is submitted
      // Add your mutation logic here
    };
  
    return (
      <Dialog open={open} onOpenChange={handleOpenChange }>
        <DialogTrigger asChild>
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement, { ref })
            : children}
        </DialogTrigger>
        <DialogContent className="max-w-lg sm:max-w-min max-h-[90vh] overflow-y-auto sm:flex-row flex-col">
          <DialogHeader>
            <DialogTitle>
              {title}
            </DialogTitle>
          </DialogHeader>
          {/* form here */}
          <RescheduleInterviewForm data={data} onSubmit={onSubmit}/>
        </DialogContent>
      </Dialog>
    );
    
  })

RescheduleDialog.displayName = "RescheduleDialog"

export default RescheduleDialog
