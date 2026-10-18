import { create } from "zustand"

interface CardStore {
  isCreateOpen: boolean
  onCreateOpen: () => void
  onCreateClose: () => void

  cardId?: number
  isUpdateOpen: boolean
  onUpdateOpen: (id: number) => void
  onUpdateClose: () => void
}

export const useCardStore = create<CardStore>((set) => ({
  isCreateOpen: false,
  onCreateOpen: () => set({ isCreateOpen: true }),
  onCreateClose: () => set({ isCreateOpen: false }),

  cardId: undefined,
  isUpdateOpen: false,
  onUpdateOpen: (cardId: number) => set({ isUpdateOpen: true, cardId }),
  onUpdateClose: () => set({ isUpdateOpen: false, cardId: undefined }),
}))
