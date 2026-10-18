import type { Bank } from "../bank/type"

export type Account = {
  id: number
  userId: number
  bank?: Bank
  name: string
  accountNumber: string | null
  accountType: string
  initialBalance: number
  balance: number
  status: string
  createdAt: string
  updatedAt: string
}

export const ACCOUNT_TYPES: Record<string, string> = {
  ACCOUNT: "은행계좌",
  CASH: "현금지갑",
}
