import { useQuery } from "@tanstack/react-query"
import { getSession } from "./api"

export const SESSION_QUERY_KEY = ["session"]

/**
 * 로그인 세션 조회 훅
 *
 * @returns 세션 query
 */
export function useSession() {
  const query = useQuery({
    queryKey: SESSION_QUERY_KEY,
    queryFn: getSession,
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
  return query
}
