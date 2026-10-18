import {
  Controller,
  useForm,
  useWatch,
  type DefaultValues,
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CardFormSchema, type CardFormValues } from "../../schema"
import { CARD_TYPES } from "../../type"
import { useGetCardIssuers } from "@/features/card-issuer/query"
import type { CardIssuer } from "@/features/card-issuer/type"
import { useGetAccounts } from "@/features/account/query"
import type { Account } from "@/features/account/type"
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

const PAYMENT_DAYS = Array.from({ length: 31 }, (_, index) => index + 1)

interface CardFormProps {
  id?: number
  onSubmit: (values: CardFormValues) => void
  defaultValues: DefaultValues<CardFormValues>
  onClose: () => void
}

export default function CardForm({
  id,
  onSubmit,
  defaultValues,
  onClose,
}: CardFormProps) {
  const { data: issuers } = useGetCardIssuers()
  const { data: accounts } = useGetAccounts()
  const bankAccounts: Account[] = (accounts ?? []).filter(
    (account: Account) => account.accountType === "ACCOUNT"
  )
  const form = useForm<CardFormValues>({
    resolver: zodResolver(CardFormSchema),
    defaultValues,
  })

  const cardType = useWatch({ control: form.control, name: "cardType" })
  const selectedIssuerId = useWatch({ control: form.control, name: "issuerId" })
  const issuerLogo = findIssuer(selectedIssuerId)?.logo
  const isCredit = cardType === "CREDIT"
  const payableAccounts = getPayableAccounts(selectedIssuerId, cardType)

  function findIssuer(issuerId?: number): CardIssuer | undefined {
    return issuers?.find((issuer: CardIssuer) => issuer.id === issuerId)
  }

  /**
   * 결제 계좌로 고를 수 있는 계좌 목록
   *
   * @param issuerId 카드사 ID
   * @param type 카드 종류
   * @returns 체크카드면 카드사와 같은 은행 계좌, 그 외에는 모든 은행 계좌
   */
  function getPayableAccounts(issuerId?: number, type?: string) {
    const issuerBankId = findIssuer(issuerId)?.bankId
    if (type !== "DEBIT" || !issuerBankId) {
      return bankAccounts
    }
    return bankAccounts.filter((account) => account.bank?.id === issuerBankId)
  }

  /**
   * 카드사나 카드 종류가 바뀌어 고를 수 없게 된 결제 계좌 비우기
   *
   * @param issuerId 바뀐 카드사 ID
   * @param type 바뀐 카드 종류
   */
  function clearUnpayableAccount(issuerId?: number, type?: string) {
    const accountId = form.getValues("accountId")
    const isPayable = getPayableAccounts(issuerId, type).some(
      (account) => account.id === accountId
    )
    if (accountId && !isPayable) {
      form.setValue("accountId", undefined as unknown as number)
    }
  }

  function handleSubmit(values: CardFormValues) {
    onSubmit({
      ...values,
      lastFourDigits: values.lastFourDigits || undefined,
      creditLimit: isCredit ? (values.creditLimit ?? undefined) : undefined,
      paymentDueDay: isCredit ? values.paymentDueDay : undefined,
    })
  }

  return (
    <form id="card-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup className="gap-4">
        <div className="relative mx-auto aspect-square size-45">
          {issuerLogo ? (
            <img
              src={issuerLogo}
              alt="카드사 로고"
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
                카드명
              </FieldLabel>
              <Input
                {...field}
                id="name"
                placeholder="카드명"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="flex items-start gap-2">
          <Controller
            name="issuerId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex-1 gap-2">
                <FieldLabel htmlFor="issuerId" className="font-semibold">
                  카드사
                </FieldLabel>
                <Select
                  value={field.value?.toString() ?? ""}
                  onValueChange={(value) => {
                    field.onChange(Number(value))
                    clearUnpayableAccount(Number(value), cardType)
                  }}
                >
                  <SelectTrigger id="issuerId" className="w-full">
                    <SelectValue placeholder="카드사를 선택하세요." />
                  </SelectTrigger>
                  <SelectContent side="bottom">
                    {issuers?.map((issuer: CardIssuer) => (
                      <SelectItem key={issuer.id} value={issuer.id.toString()}>
                        {issuer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError className="text-xs" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="cardType"
            control={form.control}
            render={({ field }) => (
              <Field className="flex-1 gap-2">
                <FieldLabel htmlFor="cardType" className="font-semibold">
                  카드 종류
                </FieldLabel>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    clearUnpayableAccount(selectedIssuerId, value)
                  }}
                >
                  <SelectTrigger id="cardType" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CARD_TYPES).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        </div>

        <Controller
          name="accountId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field className="gap-2">
              <FieldLabel htmlFor="accountId" className="font-semibold">
                결제 계좌
              </FieldLabel>
              <Select
                value={field.value?.toString() ?? ""}
                onValueChange={(value) => field.onChange(Number(value))}
              >
                <SelectTrigger id="accountId" className="w-full">
                  <SelectValue
                    placeholder={
                      payableAccounts.length > 0
                        ? "계좌를 선택하세요."
                        : "연결할 수 있는 계좌가 없습니다."
                    }
                  />
                </SelectTrigger>
                <SelectContent side="bottom">
                  {payableAccounts.map((account) => (
                    <SelectItem key={account.id} value={account.id.toString()}>
                      {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fieldState.invalid && (
                <FieldError className="text-xs" errors={[fieldState.error]} />
              )}
            </Field>
          )}
        />

        {isCredit && (
          <Controller
            name="creditLimit"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor="creditLimit" className="font-semibold">
                  한도
                </FieldLabel>
                <Input
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  id="creditLimit"
                  inputMode="numeric"
                  placeholder="선택"
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
        )}

        <div className="flex items-start gap-2">
          {isCredit && (
            <Controller
              name="paymentDueDay"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="flex-1 gap-2">
                  <FieldLabel htmlFor="paymentDueDay" className="font-semibold">
                    결제일
                  </FieldLabel>
                  <Select
                    value={field.value?.toString() ?? ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger id="paymentDueDay" className="w-full">
                      <SelectValue placeholder="결제일을 선택하세요." />
                    </SelectTrigger>
                    <SelectContent side="bottom">
                      {PAYMENT_DAYS.map((day) => (
                        <SelectItem key={day} value={day.toString()}>
                          매월 {day}일
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

          <Controller
            name="lastFourDigits"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="flex-1 gap-2">
                <FieldLabel htmlFor="lastFourDigits" className="font-semibold">
                  카드번호 끝 4자리
                </FieldLabel>
                <Input
                  {...field}
                  id="lastFourDigits"
                  inputMode="numeric"
                  placeholder="예: 1234 (선택)"
                  autoComplete="off"
                  onChange={(e) =>
                    field.onChange(
                      e.target.value.replace(/\D/g, "").slice(0, 4)
                    )
                  }
                />
                {fieldState.invalid && (
                  <FieldError className="text-xs" errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
      </FieldGroup>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onClose}>
          취소
        </Button>
        <Button type="submit">{id ? "수정" : "등록"}</Button>
      </div>
    </form>
  )
}
