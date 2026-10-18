import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AccountFormSchema, type AccountFormValues } from "../../schema"
import { useGetBanks } from "@/features/bank/query"
import type { Bank } from "@/features/bank/type"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field"
import { Input } from "@/shared/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { Button } from "@/shared/components/ui/button"
import { Icon } from "@/shared/components/ui/icon"
import { formatAmount, parseAmount } from "@/shared/lib/format"

interface AccountFormProps {
  onSubmit: (values: AccountFormValues) => void
  defaultValues: AccountFormValues
  onClose: () => void
}

export default function AccountForm({
  onSubmit,
  defaultValues,
  onClose,
}: AccountFormProps) {
  const { data: banks } = useGetBanks()
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(AccountFormSchema),
    defaultValues,
  })

  const accountType = form.watch("accountType")
  const selectedBankId = form.watch("bankId")
  const bankLogo = banks?.find((bank: Bank) => bank.id === selectedBankId)?.logo

  function handleSubmit(values: AccountFormValues) {
    onSubmit({
      ...values,
      bankId: values.accountType === "ACCOUNT" ? values.bankId : undefined,
      accountNumber: values.accountNumber || undefined,
    })
  }

  return (
    <form id="account-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="gap-4">
        <div className="relative mx-auto aspect-square size-45">
          {accountType === "ACCOUNT" && bankLogo ? (
            <img
              src={bankLogo}
              alt="은행 로고"
              className="size-full object-cover object-center"
            />
          ) : (
            <Icon.logo />
          )}
        </div>

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="name" className="font-semibold">
                계좌명
              </FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="계좌명"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="accountType"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="accountType" className="font-semibold">
                계좌 유형
              </FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="accountType" className="w-full">
                  <SelectValue placeholder="계좌 유형을 선택하세요." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACCOUNT">계좌</SelectItem>
                  <SelectItem value="CASH">현금지갑</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex items-start gap-2">
          <Controller
            name="initialBalance"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex-1 gap-2">
                <FieldLabel htmlFor="initialBalance" className="font-semibold">
                  초기 잔액
                </FieldLabel>
                <Input
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  id="initialBalance"
                  inputMode="numeric"
                  placeholder="초기 잔액"
                  autoComplete="off"
                  value={formatAmount(field.value)}
                  onChange={(e) => field.onChange(parseAmount(e.target.value))}
                />
                {fieldState.invalid && (
                  <FieldError className="text-xs" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {accountType !== "CASH" && (
            <Controller
              name="bankId"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex-1 gap-2">
                  <FieldLabel htmlFor="bankId" className="font-semibold">
                    은행
                  </FieldLabel>
                  <Select
                    value={field.value?.toString() ?? ""}
                    onValueChange={(value) => {
                      field.onChange(Number(value))
                      form.setValue("accountType", "ACCOUNT")
                    }}
                  >
                    <SelectTrigger id="bankId" className="w-full">
                      <SelectValue placeholder="은행을 선택하세요." />
                    </SelectTrigger>
                    <SelectContent side="bottom">
                      {banks?.map((bank: Bank) => (
                        <SelectItem key={bank.id} value={bank.id.toString()}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError
                      className="text-xs"
                      errors={[fieldState.error]}
                    />
                  )}
                </Field>
              )}
            />
          )}
        </div>

        <Controller
          name="accountNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="accountNumber" className="font-semibold">
                계좌번호 끝 4자리
              </FieldLabel>
              <Input
                {...field}
                id="accountNumber"
                inputMode="numeric"
                placeholder="예: 1234 (선택)"
                autoComplete="off"
                onChange={(e) =>
                  field.onChange(e.target.value.replace(/\D/g, "").slice(0, 4))
                }
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      <div className="mt-4 flex items-center justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button type="submit">등록</Button>
      </div>
    </form>
  )
}
