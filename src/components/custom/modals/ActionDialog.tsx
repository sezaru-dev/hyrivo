"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RemarksForm } from "../forms/RemarksForm";
import { useDropdownMenuStore } from "@/stores/features/dropdownMenuStore";
import { NotesForm } from "../forms/NotesForm";

export type ActionDialogProps = {
  data?: string | null;
  children: React.ReactNode
  title: string
}

export default function ActionDialog({data, children, title}: ActionDialogProps) {
  const [open, setOpen] = useState(false);
  const setOpenDropdownId = useDropdownMenuStore(
    (state) => state.setOpenDropdownId
  );
   const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setOpenDropdownId(null); // ✅ Close dropdown when dialog closes
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
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {title}
          </DialogTitle>
        </DialogHeader>
        {/* form here */}
        <NotesForm data={data} onSubmit={onSubmit}/>
      </DialogContent>
    </Dialog>
  );
}
