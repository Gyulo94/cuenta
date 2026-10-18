import { useQuery } from "@tanstack/react-query"
import { getBanks } from "./api"

export function useGetBanks() {
  const query = useQuery({
    queryFn: getBanks,
    queryKey: ["banks"],
    staleTime: Infinity,
    gcTime: Infinity,
  })
  return query
}
