import { useQuery } from "@tanstack/react-query"
import { getBanks } from "./api"

/**
 * 은행 목록 조회 훅
 *
 * @returns 은행 목록 query
 */
export function useGetBanks() {
  const query = useQuery({
    queryFn: getBanks,
    queryKey: ["banks"],
    staleTime: Infinity,
    gcTime: Infinity,
  })
  return query
}
