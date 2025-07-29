"use client";

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
import { useModalStore } from "@/stores/features/useModalStore";

export default function NewApplicationModal() {
  const { isNewAppModalOpen, closeNewAppModal, openNewAppModal } = useModalStore();

  return (
    <Dialog open={isNewAppModalOpen} onOpenChange={(val) => (val ? openNewAppModal() : closeNewAppModal())}>
      <DialogTrigger asChild>
        <Button className='bg-brand-blue text-sidebar-primary-foreground hover:bg-brand-blue/80' onClick={openNewAppModal}>
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
