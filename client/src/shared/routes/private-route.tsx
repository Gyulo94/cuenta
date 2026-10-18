import { Navigate, Outlet } from "react-router-dom"
import { useSession } from "@/features/user/query"

/**
 * 로그인 전용 라우트
 *
 * @returns 로그인 안했으면 로그인으로 이동, 로그인했으면 하위 페이지
 */
export default function PrivateRoute() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return null
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
