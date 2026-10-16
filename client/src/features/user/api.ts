import { apiClient } from "@/shared/lib/axios"
import type { Session } from "@/features/user/type"
/**
 * 로그인 세션 조회 API
 *
 * @returns 로그인한 사용자 정보
 */
export async function getSession(): Promise<Session> {
  const response = await apiClient.get("/user/session")
  return response.data.body
}
