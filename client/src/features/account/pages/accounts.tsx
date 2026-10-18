import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"
import { Plus } from "lucide-react"
import AccountContent from "../components/account-content"
import { useAccountStore } from "../store"
import { useCardStore } from "@/features/card/store"
import CardContent from "@/features/card/components/card-content"

export default function AccountsPage() {
  const { onCreateOpen: onAccountCreateOpen } = useAccountStore()
  const { onCreateOpen: onCardCreateOpen } = useCardStore()
  return (
    <Tabs defaultValue="card">
      <TabsList>
        <TabsTrigger value="card">카드</TabsTrigger>
        <TabsTrigger value="account">계좌</TabsTrigger>
      </TabsList>
      <TabsContent value="card" className="relative">
        <button
          aria-label="카드 추가"
          className="absolute -top-11.5 right-0 cursor-pointer rounded-full bg-primary p-2.5 shadow-md hover:bg-primary/90"
          onClick={onCardCreateOpen}
        >
          <Plus className="size-5 text-white" />
        </button>
        <CardContent />
      </TabsContent>
      <TabsContent value="account" className="relative">
        <button
          aria-label="계좌 추가"
          className="absolute -top-11.5 right-0 cursor-pointer rounded-full bg-primary p-2.5 shadow-md hover:bg-primary/90"
          onClick={onAccountCreateOpen}
        >
          <Plus className="size-5 text-white" />
        </button>
        <AccountContent />
      </TabsContent>
    </Tabs>
  )
}
