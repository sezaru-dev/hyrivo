import { create } from 'zustand'

type DropdownMenuState = {
  openDropdownId: string | null
  setOpenDropdownId: (id: string | null) => void
}

export const useDropdownMenuStore = create<DropdownMenuState>((set) => ({
  openDropdownId: null,
  setOpenDropdownId: (id) => set({ openDropdownId: id }),
}))