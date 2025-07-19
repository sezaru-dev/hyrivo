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
import { CirclePlus } from "lucide-react";
import { InputForm } from "../forms/NewApplicationForm";

export default function NewApplicationModal() {
  const [open, setOpen] = useState(false);
  const onSubmit = () => {
    setOpen(false);
    // Add your mutation logic here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80'>
          <CirclePlus/>
          New Application
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New Job Application</DialogTitle>
        </DialogHeader>
        {/* form here */}
        <InputForm />
      </DialogContent>
    </Dialog>
  );
}
