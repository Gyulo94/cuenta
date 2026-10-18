import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { EllipsisIcon } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { useConfirm } from "@/shared/hooks/use-confirm"
import { Icon } from "@/shared/components/ui/icon"
import { useGetAccounts } from "@/features/account/query"
import type { Account } from "@/features/account/type"
import { CARD_TYPES, type Card as CardType } from "../type"
import { useCardStore } from "../store"
import { useDeleteCard } from "../query"

interface CardItemProps {
  card: CardType
}

export default function CardItem({ card }: CardItemProps) {
  const { onUpdateOpen } = useCardStore()
  const { mutate: deleteCard } = useDeleteCard()
  const { data: accounts } = useGetAccounts()
  const account = accounts?.find(
    (account: Account) => account.id === card.accountId
  )
  const [ConfirmDialog, confirm] = useConfirm(
    "카드를 삭제하시겠습니까?",
    "삭제한 카드는 복구할 수 없습니다."
  )

  async function onDelete(id: number) {
    const ok = await confirm()
    if (ok) {
      deleteCard(id)
    }
  }

  return (
    <>
      {ConfirmDialog}
      <Card className="gap-3 py-3 shadow-md lg:gap-0">
        <CardHeader className="flex min-h-7 items-center justify-between px-2">
          <CardTitle>
            {card.name}
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              {card.issuer.name}
              {card.lastFourDigits && `(${card.lastFourDigits})`}
            </span>
          </CardTitle>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size={"xs"}
                className="cursor-pointer text-muted-foreground"
              >
                <EllipsisIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onSelect={() => onUpdateOpen(card.id)}>
                수정
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive hover:bg-destructive/10! hover:text-destructive!"
                onSelect={() => onDelete(card.id)}
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex h-45 items-center gap-0 px-0 text-sm lg:justify-center">
          <div className="relative flex aspect-auto w-[50%] justify-center px-0 lg:px-2">
            {card.issuer.logo ? (
              <img
                src={card.issuer.logo}
                alt={card.issuer.name || "카드사 로고"}
                className="size-25 object-cover object-center"
              />
            ) : (
              <Icon.logo className="size-25" />
            )}
          </div>
          <div className="flex h-full w-[50%] flex-col justify-center gap-2 border-l pr-0 pl-6 lg:px-6">
            <p>
              종류:{" "}
              <span className="text-muted-foreground">
                {CARD_TYPES[card.cardType]}
              </span>
            </p>
            <p>
              결제 계좌:{" "}
              <span className="text-muted-foreground">
                {account?.name ?? "-"}
              </span>
            </p>
            {card.cardType === "CREDIT" && card.paymentDueDay && (
              <p>
                결제일:{" "}
                <span className="text-muted-foreground">
                  매월 {card.paymentDueDay}일
                </span>
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}
