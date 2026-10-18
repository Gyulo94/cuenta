import { create } from "zustand"

interface AccountStore {
  isCreateOpen: boolean
  onCreateOpen: () => void
  onCreateClose: () => void

  accountId?: number
  isUpdateOpen: boolean
  onUpdateOpen: (id: number) => void
  onUpdateClose: () => void
}

export const useAccountStore = create<AccountStore>((set) => ({
  isCreateOpen: false,
  onCreateOpen: () => set({ isCreateOpen: true }),
  onCreateClose: () => set({ isCreateOpen: false }),

  accountId: undefined,
  isUpdateOpen: false,
  onUpdateOpen: (accountId: number) => set({ isUpdateOpen: true, accountId }),
  onUpdateClose: () => set({ isUpdateOpen: false, accountId: undefined }),
}))
