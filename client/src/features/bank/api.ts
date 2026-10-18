import apiClient from "@/shared/lib/axios"

/**
 * 은행 목록 조회 API
 *
 * @returns 서버 응답
 */
export async function getBanks() {
  const response = await apiClient.get("/banks")
  return response.data.body
}
