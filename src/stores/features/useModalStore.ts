import { create } from "zustand";

type ModalStore = {
  isNewAppModalOpen: boolean;
  openNewAppModal: () => void;
  closeNewAppModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isNewAppModalOpen: false,
  openNewAppModal: () => set({ isNewAppModalOpen: true }),
  closeNewAppModal: () => set({ isNewAppModalOpen: false }),
}));
