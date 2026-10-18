import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"
import { Plus } from "lucide-react"
import AccountContent from "../components/account-content"
import { useAccountStore } from "../store"

export default function AccountsPage() {
  const { onCreateOpen } = useAccountStore()
  return (
    <Tabs defaultValue="paymentMethod">
      <TabsList>
        <TabsTrigger value="paymentMethod">카드</TabsTrigger>
        <TabsTrigger value="account">계좌</TabsTrigger>
      </TabsList>
      <TabsContent value="paymentMethod"></TabsContent>
      <TabsContent value="account" className="relative">
        <button
          aria-label="계좌 추가"
          className="absolute -top-11.5 right-0 cursor-pointer rounded-full bg-primary p-2.5 shadow-md hover:bg-primary/90"
          onClick={onCreateOpen}
        >
          <Plus className="size-5 text-white" />
        </button>
        <AccountContent />
      </TabsContent>
    </Tabs>
  )
}
