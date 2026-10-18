import type { CardIssuer } from "../card-issuer/type"

export type Card = {
  id: number
  userId: number
  issuer: CardIssuer
  accountId: number
  name: string
  cardType: "CREDIT" | "DEBIT"
  lastFourDigits: string | null
  creditLimit?: number | null
  billingDay?: number | null
  paymentDueDay?: number | null
  status?: "ACTIVE" | "SUSPENDED" | "CLOSED"
  createdAt: string
  updatedAt: string
}

export const CARD_TYPES: Record<string, string> = {
  CREDIT: "신용카드",
  DEBIT: "체크카드",
}
