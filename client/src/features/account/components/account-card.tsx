import type { Account } from "../type"
import { ACCOUNT_TYPES } from "../type"
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

interface AccountCardProps {
  account: Account
}

export default function AccountCard({ account }: AccountCardProps) {
  return (
    <>
      {/* <ConfirmDialog /> */}
      <Card className="gap-3 py-3 shadow-md lg:gap-0">
        <CardHeader className="flex items-center justify-between px-2">
          <CardTitle>
            {account.name}
            {account.bank && account.accountNumber && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                {account.bank.name}({account.accountNumber})
              </span>
            )}
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant={"ghost"}
                size={"sm"}
                className="cursor-pointer p-0 text-muted-foreground"
              >
                <EllipsisIcon className="size-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={account.accountType === "CASH" ? undefined : () => {}}
              >
                수정
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={account.accountType === "CASH" ? undefined : () => {}}
              >
                삭제
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
