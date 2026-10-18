import { create } from "zustand"

interface AccountStore {
  isCreateOpen: boolean
  onCreateOpen: () => void
  onCreateClose: () => void
}

export const useAccountStore = create<AccountStore>((set) => ({
  isCreateOpen: false,
  onCreateOpen: () => set({ isCreateOpen: true }),
  onCreateClose: () => set({ isCreateOpen: false }),
}))
