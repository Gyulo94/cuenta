import { useState } from "react"
import axios from "axios"

import { apiClient } from "@/shared/api/client"
import { Button } from "@/shared/components/ui/button"

type TestResponse = {
  message: string
  timestamp: string
}

export function App() {
  const [result, setResult] = useState<TestResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const testApiConnection = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await apiClient.get<TestResponse>("/test")
      setResult(response.data)
    } catch (requestError) {
      setResult(null)
      setError(
        axios.isAxiosError(requestError)
          ? `API 요청 실패: ${requestError.message}`
          : "알 수 없는 오류가 발생했습니다.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-lg flex-col gap-5 rounded-xl border p-6 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold">Cuenta API 연결 테스트</h1>
          <p className="text-sm text-muted-foreground">
            프론트엔드에서 상대 경로 <code>/api/test</code>를 호출합니다.
          </p>
        </div>

        <Button onClick={testApiConnection} disabled={isLoading}>
          {isLoading ? "호출 중..." : "백엔드 API 호출"}
        </Button>

        {result && (
          <div className="rounded-lg border border-green-600/30 bg-green-500/10 p-4 text-sm">
            <p className="font-medium text-green-700 dark:text-green-400">
              연결 성공
            </p>
            <p className="mt-1">{result.message}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-lg border border-red-600/30 bg-red-500/10 p-4 text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}
      </div>
    </main>
  )
}

export default App
