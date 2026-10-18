import apiClient from "@/shared/lib/axios"

/**
 * 카드 발급사 목록 조회 API
 *
 * @returns 서버 응답
 */
export async function getCardIssuers() {
  const response = await apiClient.get("/card-issuers")
  return response.data.body
}
