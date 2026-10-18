import { Modal } from "@/shared/components/ui/dialog"
import { useGetAccountById, useUpdateAccount } from "@/features/account/query"
import type { AccountFormValues } from "../../schema"
import { useAccountStore } from "../../store"
import AccountForm from "./account-form"

export default function UpdateAccountDialog() {
  const { accountId, isUpdateOpen, onUpdateClose } = useAccountStore()
  const { data: account } = useGetAccountById(accountId)
  const { mutate: updateAccount } = useUpdateAccount(accountId)

  function onSubmit(values: AccountFormValues) {
    updateAccount(values, { onSuccess: onUpdateClose })
  }

  return (
    <Modal
      open={isUpdateOpen}
      onOpenChange={(open) => !open && onUpdateClose()}
      title="계좌 / 현금지갑 수정"
      description="계좌 또는 현금지갑 정보를 수정하세요."
    >
      {account && (
        <AccountForm
          id={accountId}
          onSubmit={onSubmit}
          defaultValues={{
            name: account.name,
            accountType: account.accountType,
            initialBalance: account.initialBalance,
            bankId: account.bank?.id,
            accountNumber: account.accountNumber ?? "",
          }}
          onClose={onUpdateClose}
        />
      )}
    </Modal>
  )
}
