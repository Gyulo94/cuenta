import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { useCreateAccount } from "@/features/account/query"
import { useAccountStore } from "@/features/account/store"
import z from "zod/v3"
import { Plus } from "lucide-react"
import type { AccountFormSchema } from "../schema"
import AccountForm from "./form/account-form"

export default function CreateAccountButton() {
  const { isCreateOpen, onCreateOpen, onCreateClose } = useAccountStore()
  const { mutate: createAccount } = useCreateAccount()
  const defaultValues = {
    name: "",
    logo: "",
    accountType: "CASH",
    initialBalance: 0,
    bankId: undefined,
    accountNumber: "",
  }

  function onSubmit(values: z.infer<typeof AccountFormSchema>) {
    createAccount(values, {
      onSuccess: onCreateClose,
    })
  }

  return (
    <Dialog
      open={isCreateOpen}
      onOpenChange={(open) => (open ? onCreateOpen() : onCreateClose())}
    >
      <DialogTrigger asChild>
        <button
          aria-label="계좌 추가"
          className="absolute -top-11.5 right-0 cursor-pointer rounded-full bg-primary p-2.5 shadow-md hover:bg-primary/90"
        >
          <Plus className="size-5 text-white" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>계좌 / 현금지갑 추가</DialogTitle>
          <DialogDescription>
            계좌 또는 현금지갑 정보를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <AccountForm
          onSubmit={onSubmit}
          defaultValues={defaultValues}
          onClose={onCreateClose}
        />
      </DialogContent>
    </Dialog>
  )
}
