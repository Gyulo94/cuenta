import CreateAccountDialog from "@/features/account/components/form/create-account-dialog"
import UpdateAccountDialog from "@/features/account/components/form/update-account-dialog"
import CreateCardDialog from "@/features/card/components/form/create-card-dialog"
import UpdateCardDialog from "@/features/card/components/form/update-card-dialog"

export default function ModalProvider() {
  return (
    <>
      <CreateAccountDialog />
      <UpdateAccountDialog />
      <CreateCardDialog />
      <UpdateCardDialog />
    </>
  )
}
