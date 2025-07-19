"use client";

import { useState } from "react";
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

export type hasRemarkProps = {
  hasRemark?: string | null;
}

export default function EditRemarksModal({hasRemark}: hasRemarkProps) {
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
        <Button variant="ghost" className=" justify-start px-2">
          {hasRemark ? "Edit Remarks" : "Add Remarks"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {hasRemark ? "Edit Remarks" : "Add Remarks"}
          </DialogTitle>
        </DialogHeader>
        {/* form here */}
        <RemarksForm hasRemark={hasRemark} onSubmit={onSubmit}/>
      </DialogContent>
    </Dialog>
  );
}
