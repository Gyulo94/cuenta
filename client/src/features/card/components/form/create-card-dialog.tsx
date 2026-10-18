import { Modal } from "@/shared/components/ui/dialog"
import { useCreateCard } from "@/features/card/query"
import type { CardFormValues } from "../../schema"
import { useCardStore } from "../../store"
import CardForm from "./card-form"

export default function CreateCardDialog() {
  const { isCreateOpen, onCreateClose } = useCardStore()
  const { mutate: createCard } = useCreateCard()

  function onSubmit(values: CardFormValues) {
    createCard(values, {
      onSuccess: onCreateClose,
    })
  }

  return (
    <Modal
      open={isCreateOpen}
      onOpenChange={(open) => !open && onCreateClose()}
      title="카드 추가"
      description="카드 정보를 입력하세요."
    >
      <CardForm
        onSubmit={onSubmit}
        defaultValues={{
          name: "",
          cardType: "CREDIT",
          lastFourDigits: "",
          creditLimit: null,
        }}
        onClose={onCreateClose}
      />
    </Modal>
  )
}
