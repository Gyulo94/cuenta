import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useRegisterVerifyMail } from "@/features/auth/query"
import { NotFoundPage } from "@/shared/pages"

export default function RegisterVerifyPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")
  const { mutate: verify } = useRegisterVerifyMail()
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    if (token) {
      verify(token, {
        onError() {
          setIsError(true)
        },
      })
    }
  }, [token, verify])

  if (isError) {
    return <NotFoundPage />
  }

  return null
}
