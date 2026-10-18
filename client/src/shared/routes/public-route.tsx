import { Navigate, Outlet } from "react-router-dom"
import { useSession } from "@/features/user/query"

/**
 * 비로그인 전용 라우트
 *
 * @returns 로그인했으면 메인으로 이동, 아니면 하위 페이지
 */
export default function PublicRoute() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return null
  }

  if (session) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
