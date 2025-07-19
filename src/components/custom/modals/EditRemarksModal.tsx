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

export type hasRemarkProps = {
  hasRemark?: string | null;
}

export default function EditRemarksModal({hasRemark}: hasRemarkProps) {
  const [open, setOpen] = useState(false);
  const onSubmit = () => {
    setOpen(false);
    // Add your mutation logic here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start px-2">
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
        <RemarksForm hasRemark={hasRemark}/>
      </DialogContent>
    </Dialog>
  );
}
