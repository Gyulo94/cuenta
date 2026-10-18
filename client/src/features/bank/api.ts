import apiClient from "@/shared/lib/axios"

export async function getBanks() {
  const response = await apiClient.get("/banks")
  return response.data.body
}
