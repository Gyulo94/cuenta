import apiClient from "@/shared/lib/axios"
import type { CardFormValues } from "./schema"

/**
 * 카드 생성 API
 *
 * @param values 카드 생성 폼 값
 * @returns 서버 응답
 */
export async function createCard(values: CardFormValues) {
  const response = await apiClient.post("/cards", values)
  return response.data
}

/**
 * 카드 목록 조회 API
 *
 * @returns 서버 응답
 */
export async function getCards() {
  const response = await apiClient.get("/cards")
  return response.data.body
}

/**
 * 카드 상세 조회 API
 *
 * @param id 카드 ID
 * @returns 서버 응답
 */
export async function getCardById(id: number) {
  const response = await apiClient.get(`/cards/${id}`)
  return response.data.body
}

/**
 * 카드 수정 API
 *
 * @param id 카드 ID
 * @param values 카드 수정 폼 값
 * @returns 서버 응답
 */
export async function updateCard(id: number, values: CardFormValues) {
  const response = await apiClient.put(`/cards/${id}`, values)
  return response.data
}

/**
 * 카드 삭제 API
 *
 * @param id 카드 ID
 * @returns 서버 응답
 */
export async function deleteCard(id: number) {
  const response = await apiClient.delete(`/cards/${id}`)
  return response.data
}
