import { useQuery } from "@tanstack/react-query"
import { getCardIssuers } from "./api"

/**
 * 카드 발급사 목록 조회 훅
 *
 * @returns 카드 발급사 목록 query
 */
export function useGetCardIssuers() {
  const query = useQuery({
    queryFn: getCardIssuers,
    queryKey: ["card-issuers"],
    staleTime: Infinity,
    gcTime: Infinity,
  })
  return query
}
