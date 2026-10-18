import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createAccount,
  getAccountById,
  getAccounts,
  updateAccount,
  deleteAccount,
} from "./api"
import { toast } from "sonner"
import { useSession } from "../user/query"
import type { AccountFormValues } from "./schema"

/**
 * 계좌 생성 훅
 *
 * @returns 계좌 생성 mutation
 */
export function useCreateAccount() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createAccount,
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
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
 * 계좌 목록 조회 훅
 *
 * @returns 계좌 목록 query
 */
export function useGetAccounts() {
  const { data: session } = useSession()
  const query = useQuery({
    queryKey: ["accounts", { userId: session?.id }],
    queryFn: getAccounts,
  })
  return query
}

/**
 * 계좌 상세 조회 훅
 *
 * @param id 계좌 ID
 * @returns 계좌 상세 query
 */
export function useGetAccountById(id?: number) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["account", { accountId: id }],
    queryFn: () => getAccountById(id!),
  })
  return query
}

/**
 * 계좌 수정 훅
 *
 * @param id 계좌 ID
 * @returns 계좌 수정 mutation
 */
export function useUpdateAccount(id?: number) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (values: AccountFormValues) => updateAccount(id!, values),
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
      queryClient.invalidateQueries({
        queryKey: ["account", { accountId: id }],
      })
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
 * 계좌 삭제 훅
 *
 * @returns 계좌 삭제 mutation
 */
export function useDeleteAccount() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: number) => deleteAccount(id),
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["accounts"] })
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    },
  })
  return mutation
}
