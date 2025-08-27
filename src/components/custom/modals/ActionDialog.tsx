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
import NotesForm from "../forms/NotesForm";
import InterviewRemarksForm from "../forms/CompletedInterviewRemarksForm";
import { JobApplicationType } from "@/types";


export type ActionDialogProps = {
  data: JobApplicationType
  children: React.ReactElement
  title: string
  form: 'notes' | 'remarks'
}

const ActionDialog = React.forwardRef<HTMLButtonElement, ActionDialogProps>(
  ({ data, children, title, form }, ref) => {
    
    const [open, setOpen] = useState(false);
    const setOpenDropdownId = useDropdownMenuStore(
      (state) => state.setOpenDropdownId
    );
     const handleOpenChange = (isOpen: boolean) => {
      setOpen(isOpen);
      if (!isOpen) {
        setOpenDropdownId(null); // Close dropdown when dialog closes
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
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {title}
            </DialogTitle>
          </DialogHeader>
            {form === "notes" ? (
              <NotesForm data={data} onSubmit={onSubmit} />
            ) : (
              <InterviewRemarksForm data={data} onSubmit={onSubmit} />
            )}
        </DialogContent>
      </Dialog>
    );
  })

ActionDialog.displayName = "ActionDialog"

export default ActionDialog
