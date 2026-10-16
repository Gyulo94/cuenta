import { apiClient } from "@/shared/lib/axios"
import { z } from "zod/v3"
import type {
  LoginFormSchema,
  RegisterFormSchema,
  ResetPasswordFormSchema,
} from "./schema"

/**
 * 회원가입 API
 *
 * @param values 회원가입 폼 값
 * @returns 서버 응답
 */
export async function register(values: z.infer<typeof RegisterFormSchema>) {
  const { confirmPassword, ...payload } = values
  const response = await apiClient.post("/auth/register", payload)
  return response.data
}

/**
 * 회원가입 이메일 인증 API
 *
 * @param token 인증 메일 토큰
 * @returns 서버 응답
 */
export async function registerVerifyMail(token?: string) {
  const values = { token, type: "register" }
  const response = await apiClient.post("/auth/verify", values)
  return response.data
}

/**
 * 로그인 API
 *
 * @param values 로그인 폼 값
 * @returns 서버 응답
 */
export async function login(values: z.infer<typeof LoginFormSchema>) {
  const response = await apiClient.post("/auth/login", values)
  return response.data
}

/**
 * 비밀번호 재설정 메일 발송 API
 *
 * @param email 재설정 메일을 받을 이메일
 * @returns 서버 응답
 */
export async function sendResetPasswordMail(email: string) {
  const values = { email, type: "reset" }
  const response = await apiClient.post("/auth/reset-password/send", values)
  return response.data
}

/**
 * 비밀번호 재설정 토큰 확인 API
 *
 * @param token 재설정 메일 토큰
 * @returns 토큰 주인의 이메일 ({ email })
 */
export async function resetPasswordVerifyMail(token?: string) {
  const response = await apiClient.get("/auth/reset-password/verify", {
    params: { token },
  })
  return response.data.body
}

/**
 * 비밀번호 재설정 API
 *
 * @param values 비밀번호 재설정 폼 값
 * @returns 서버 응답
 */
export async function resetPassword(
  values: z.infer<typeof ResetPasswordFormSchema>
) {
  const { confirmNewPassword, email, ...rest } = values
  const response = await apiClient.post("/auth/reset-password", rest)

  return response.data
}
