import { useGetAccounts } from "@/features/account/query"
import type { Account } from "@/features/account/type"
import AccountCard from "./account-card"

export default function AccountContent() {
  const { data } = useGetAccounts()
  const accounts = data ?? []

  return (
    <div className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-4">
      {accounts.length > 0 ? (
        accounts.map((account: Account) => (
          <AccountCard key={account.id} account={account} />
        ))
      ) : (
        <div className="col-span-full my-20 size-full text-center">
          <p className="text-muted-foreground">등록된 계좌가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
