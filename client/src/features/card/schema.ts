import z from "zod/v3"

export const CardFormSchema = z
  .object({
    name: z.string().min(1, { message: "카드명을 입력하세요." }),
    issuerId: z.number({
      required_error: "카드사를 선택하세요.",
      invalid_type_error: "카드사를 선택하세요.",
    }),
    cardType: z.enum(["CREDIT", "DEBIT"]),
    accountId: z.number({
      required_error: "결제 계좌를 선택하세요.",
      invalid_type_error: "결제 계좌를 선택하세요.",
    }),
    lastFourDigits: z
      .string()
      .regex(/^(\d{4})?$/, { message: "카드번호 끝 4자리를 입력하세요." })
      .optional(),
    creditLimit: z
      .number()
      .min(0, { message: "한도는 0 이상이어야 합니다." })
      .nullable()
      .optional(),
    paymentDueDay: z.number().int().min(1).max(31).optional(),
  })
  .refine((values) => values.cardType !== "CREDIT" || !!values.paymentDueDay, {
    message: "결제일을 선택하세요.",
    path: ["paymentDueDay"],
  })

export type CardFormValues = z.infer<typeof CardFormSchema>
