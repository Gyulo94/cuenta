import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createCard,
  getCardById,
  getCards,
  updateCard,
  deleteCard,
} from "./api"
import { toast } from "sonner"
import { useSession } from "../user/query"
import type { CardFormValues } from "./schema"

/**
 * 카드 생성 훅
 *
 * @returns 카드 생성 mutation
 */
export function useCreateCard() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createCard,
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["cards"] })
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
 * 카드 목록 조회 훅
 *
 * @returns 카드 목록 query
 */
export function useGetCards() {
  const { data: session } = useSession()
  const query = useQuery({
    queryKey: ["cards", { userId: session?.id }],
    queryFn: getCards,
  })
  return query
}

/**
 * 카드 상세 조회 훅
 *
 * @param id 카드 ID
 * @returns 카드 상세 query
 */
export function useGetCardById(id?: number) {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["card", { cardId: id }],
    queryFn: () => getCardById(id!),
  })
  return query
}

/**
 * 카드 수정 훅
 *
 * @param id 카드 ID
 * @returns 카드 수정 mutation
 */
export function useUpdateCard(id?: number) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (values: CardFormValues) => updateCard(id!, values),
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["cards"] })
      queryClient.invalidateQueries({
        queryKey: ["card", { cardId: id }],
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
 * 카드 삭제 훅
 *
 * @returns 카드 삭제 mutation
 */
export function useDeleteCard() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (id: number) => deleteCard(id),
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["cards"] })
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    },
  })
  return mutation
}
