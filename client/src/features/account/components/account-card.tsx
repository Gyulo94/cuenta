import type { Account } from "../type"
import { ACCOUNT_TYPES } from "../type"
import { useConfirm } from "@/shared/hooks/use-confirm"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { EllipsisIcon } from "lucide-react"
import { Icon } from "@/shared/components/ui/icon"
import { Button } from "@/shared/components/ui/button"
import { formatAmount } from "@/shared/lib/format"
import { useAccountStore } from "../store"
import { useDeleteAccount } from "../query"

interface AccountCardProps {
  account: Account
}

export default function AccountCard({ account }: AccountCardProps) {
  const { onUpdateOpen } = useAccountStore()
  const { mutate: deleteAccount } = useDeleteAccount()
  const [ConfirmDialog, confirm] = useConfirm(
    "계좌를 삭제하시겠습니까?",
    "삭제한 계좌는 복구할 수 없습니다."
  )

  async function onDelete(id: number) {
    const ok = await confirm()
    if (ok) {
      deleteAccount(id)
    }
  }

  return (
    <>
      {ConfirmDialog}
      <Card className="gap-3 py-3 shadow-md lg:gap-0">
        <CardHeader className="flex min-h-7 items-center justify-between px-2">
          <CardTitle>
            {account.name}
            {account.bank && account.accountNumber && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {account.bank.name}({account.accountNumber})
              </span>
            )}
          </CardTitle>
          {account.accountType !== "CASH" && (
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
                <DropdownMenuItem onSelect={() => onUpdateOpen(account.id)}>
                  수정
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive hover:bg-destructive/10! hover:text-destructive!"
                  onSelect={() => onDelete(account.id)}
                >
                  삭제
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardHeader>
        <CardContent className="flex h-45 items-center gap-0 px-0 text-sm lg:justify-center">
          <div className="relative flex aspect-auto w-[50%] justify-center px-0 lg:px-2">
            {account.bank ? (
              <img
                src={account.bank.logo}
                alt={account.bank.name || "은행 로고"}
                className="size-25 object-cover object-center"
              />
            ) : (
              <Icon.logo className="size-25" />
            )}
          </div>
          <div className="flex h-full w-[50%] flex-col justify-center gap-2 border-l pr-0 pl-6 lg:px-6">
            <p>
              타입:{" "}
              <span className="text-muted-foreground">
                {ACCOUNT_TYPES[account.accountType]}
              </span>
            </p>
            <p>
              잔액:{" "}
              <span className="text-muted-foreground">
                {formatAmount(account.balance)} 원
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
