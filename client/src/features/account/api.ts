import apiClient from "@/shared/lib/axios"
import type { AccountFormValues } from "./schema"

/**
 * 계좌 생성 API
 *
 * @param values 계좌 생성 폼 값
 * @returns 서버 응답
 */
export async function createAccount(values: AccountFormValues) {
  const response = await apiClient.post("/accounts", values)
  return response.data
}

/**
 * 계좌 목록 조회 API
 *
 * @returns 서버 응답
 */
export async function getAccounts() {
  const response = await apiClient.get("/accounts")
  return response.data.body
}

/**
 * 계좌 상세 조회 API
 *
 * @param id 계좌 ID
 * @returns 서버 응답
 */
export async function getAccountById(id: number) {
  const response = await apiClient.get(`/accounts/${id}`)
  return response.data.body
}

/**
 * 계좌 수정 API
 *
 * @param id 계좌 ID
 * @param values 계좌 수정 폼 값
 * @returns 서버 응답
 */
export async function updateAccount(id: number, values: AccountFormValues) {
  const response = await apiClient.put(`/accounts/${id}`, values)
  return response.data
}

/**
 * 계좌 삭제 API
 *
 * @param id 계좌 ID
 * @returns 서버 응답
 */
export async function deleteAccount(id: number) {
  const response = await apiClient.delete(`/accounts/${id}`)
  return response.data
}
