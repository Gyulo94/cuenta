import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createAccount, getAccounts } from "./api"
import { toast } from "sonner"
import { useSession } from "../user/query"

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

export function useGetAccounts() {
  const { data: session } = useSession()
  const query = useQuery({
    queryKey: ["accounts", { userId: session?.id }],
    queryFn: getAccounts,
  })
  return query
}
