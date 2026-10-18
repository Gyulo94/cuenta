import apiClient from "@/shared/lib/axios"
import type { AccountFormValues } from "./schema"

export async function createAccount(values: AccountFormValues) {
  const response = await apiClient.post("/accounts", values)
  return response.data
}

export async function getAccounts() {
  const response = await apiClient.get("/accounts")
  return response.data.body
}
