import { useSearchParams } from "react-router-dom"
import { useResetPasswordVerifyMail } from "@/features/auth/query"
import ResetPasswordForm from "@/features/auth/components/form/reset-password-form"
import { NotFoundPage } from "@/shared/pages"

export default function ResetPasswordVerifyPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token") || ""
  const { data, isError, isLoading } = useResetPasswordVerifyMail(
    token || undefined
  )

  if (isLoading) {
    return null
  }

  if (isError || !data) {
    return <NotFoundPage />
  }

  return <ResetPasswordForm token={token} email={data?.email || ""} />
}
