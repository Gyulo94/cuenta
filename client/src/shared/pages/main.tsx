import { useEffect } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { useSession } from "@/features/user/query"

export default function MainPage() {
  const navigate = useNavigate()
  const { data: session, isError } = useSession()

  useEffect(() => {
    if (isError) {
      navigate("/login", { replace: true })
    }
  }, [isError, navigate])

  if (!session) {
    return null
  } else {
    return <Navigate to="/dashboard" replace />
  }
}
