import CreateAccountDialog from "@/features/account/components/form/create-account-dialog"
import UpdateAccountDialog from "@/features/account/components/form/update-account-dialog"

export default function ModalProvider() {
  return (
    <>
      <CreateAccountDialog />
      <UpdateAccountDialog />
    </>
  )
}
