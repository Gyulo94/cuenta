import { Modal } from "@/shared/components/ui/dialog"
import { useCreateAccount } from "@/features/account/query"
import type { AccountFormValues } from "../../schema"
import AccountForm from "./account-form"
import { useAccountStore } from "../../store"

export default function CreateAccountDialog() {
  const { isCreateOpen, onCreateClose } = useAccountStore()
  const { mutate: createAccount } = useCreateAccount()

  const DEFAULT_VALUES: AccountFormValues = {
    name: "",
    accountType: "ACCOUNT",
    initialBalance: 0,
    bankId: undefined,
    accountNumber: "",
  }

  function onSubmit(values: AccountFormValues) {
    createAccount(values, {
      onSuccess: onCreateClose,
    })
  }

  return (
    <Modal
      open={isCreateOpen}
      onOpenChange={onCreateClose}
      title="계좌 추가"
      description="계좌 정보를 입력하세요."
    >
      <AccountForm
        onSubmit={onSubmit}
        defaultValues={DEFAULT_VALUES}
        onClose={onCreateClose}
      />
    </Modal>
  )
}
