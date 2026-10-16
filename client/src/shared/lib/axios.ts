import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios"
import { queryClient } from "@/shared/lib/query-client"

export class ApiHttpError extends Error {
  statusCode?: number
  constructor(message: string, statusCode?: number) {
    super(message)
    this.name = "ApiHttpError"
    this.statusCode = statusCode
  }
}

function apiError(error: unknown): ApiHttpError {
  if (error instanceof ApiHttpError) return error

  if (axios.isAxiosError(error)) {
    const responseBody = error.response?.data as
      { message?: string; statusCode?: number } | undefined
    const statusCode = error.response?.status ?? responseBody?.statusCode
    const message =
      responseBody?.message ?? error.message ?? "오류가 발생했습니다."
    return new ApiHttpError(message, statusCode)
  }

  return new ApiHttpError(
    error instanceof Error ? error.message : "오류가 발생했습니다."
  )
}

export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
})

let refreshPromise: Promise<void> | null = null

const PUBLIC_PATHS = ["/login", "/register", "/reset-password"]

function redirectToLogin() {
  const { pathname } = window.location
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return
  }
  queryClient.clear()
  window.location.replace("/login")
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined
    const statusCode = error.response?.status
    const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh")

    const isAuthEndpoint =
      originalRequest?.url?.includes("/auth/login") ||
      originalRequest?.url?.includes("/auth/register") ||
      originalRequest?.url?.includes("/auth/verify") ||
      originalRequest?.url?.includes("/auth/reset-password") ||
      originalRequest?.url?.includes("/auth/logout")

    if (
      !originalRequest ||
      statusCode !== 401 ||
      isRefreshRequest ||
      originalRequest._retry ||
      isAuthEndpoint
    ) {
      return Promise.reject(apiError(error))
    }

    originalRequest._retry = true

    try {
      if (!refreshPromise) {
        refreshPromise = apiClient
          .post("/auth/refresh")
          .then(() => undefined)
          .finally(() => {
            refreshPromise = null
          })
      }

      await refreshPromise
      return apiClient(originalRequest)
    } catch (refreshError) {
      redirectToLogin()
      return Promise.reject(apiError(refreshError))
    }
  }
)

export default apiClient
