import { Modal } from "@/shared/components/ui/dialog"
import { useGetCardById, useUpdateCard } from "@/features/card/query"
import type { CardFormValues } from "../../schema"
import { useCardStore } from "../../store"
import CardForm from "./card-form"

export default function UpdateCardDialog() {
  const { cardId, isUpdateOpen, onUpdateClose } = useCardStore()
  const { data: card } = useGetCardById(cardId)
  const { mutate: updateCard } = useUpdateCard(cardId)

  function onSubmit(values: CardFormValues) {
    updateCard(values, { onSuccess: onUpdateClose })
  }

  return (
    <Modal
      open={isUpdateOpen}
      onOpenChange={(open) => !open && onUpdateClose()}
      title="카드 수정"
      description="카드 정보를 수정하세요."
    >
      {card && (
        <CardForm
          id={cardId}
          onSubmit={onSubmit}
          defaultValues={{
            name: card.name,
            issuerId: card.issuer.id,
            cardType: card.cardType,
            accountId: card.accountId,
            lastFourDigits: card.lastFourDigits ?? "",
            creditLimit: card.creditLimit ?? null,
            paymentDueDay: card.paymentDueDay ?? undefined,
          }}
          onClose={onUpdateClose}
        />
      )}
    </Modal>
  )
}
