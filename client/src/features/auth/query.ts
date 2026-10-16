import { useMutation, useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import {
  login,
  register,
  registerVerifyMail,
  resetPassword,
  resetPasswordVerifyMail,
  sendResetPasswordMail,
} from "./api"
import { toast } from "sonner"

/**
 * 회원가입 훅
 *
 * @returns 회원가입 mutation
 */
export function useRegister() {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data?.message)
      navigate("/login")
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    },
  })
  return mutation
}

/**
 * 회원가입 이메일 인증 훅
 *
 * @returns 이메일 인증 mutation
 */
export function useRegisterVerifyMail() {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: (token?: string) => registerVerifyMail(token),
    onSuccess: (data) => {
      toast.success(data.message)
      navigate("/login")
    },
  })
  return mutation
}

/**
 * 로그인 훅
 *
 * @returns 로그인 mutation
 */
export function useLogin() {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/")
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    },
  })
  return mutation
}

/**
 * 비밀번호 재설정 메일 발송 훅
 *
 * @returns 메일 발송 mutation
 */
export function useSendResetPasswordMail() {
  const mutation = useMutation({
    mutationFn: (email: string) => sendResetPasswordMail(email),
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    },
  })
  return mutation
}

/**
 * 비밀번호 재설정 토큰 확인 훅
 *
 * @param token 재설정 메일 토큰
 * @returns 토큰 확인 query
 */
export function useResetPasswordVerifyMail(token?: string) {
  const query = useQuery({
    queryKey: ["resetPasswordVerifyMail", { token }],
    queryFn: () => resetPasswordVerifyMail(token),
  })
  return query
}

/**
 * 비밀번호 재설정 훅
 *
 * @returns 비밀번호 재설정 mutation
 */
export function useResetPassword() {
  const navigate = useNavigate()
  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      toast.success(data.message)
      navigate("/login")
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    },
  })
  return mutation
}
