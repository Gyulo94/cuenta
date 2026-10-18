import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs"
import CreateAccountButton from "../components/create-account-button"
import AccountContent from "../components/account-content"

export default function AccountsPage() {
  return (
    <Tabs defaultValue="paymentMethod">
      <TabsList>
        <TabsTrigger value="paymentMethod">카드</TabsTrigger>
        <TabsTrigger value="account">계좌</TabsTrigger>
      </TabsList>
      <TabsContent value="paymentMethod"></TabsContent>
      <TabsContent value="account" className="relative">
        <CreateAccountButton />
        <AccountContent />
      </TabsContent>
    </Tabs>
  )
}
