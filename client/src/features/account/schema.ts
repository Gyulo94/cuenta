import z from "zod/v3"

export const AccountFormSchema = z.object({
  name: z.string().min(1, { message: "이름을 입력하세요." }),
  accountType: z.string().min(1, { message: "계좌 유형을 입력하세요." }),
  initialBalance: z
    .number({
      required_error: "초기 잔액을 입력하세요.",
      invalid_type_error: "초기 잔액을 입력하세요.",
    })
    .min(0, { message: "초기 잔액은 0 이상이어야 합니다." }),
  bankId: z.number().optional(),
  accountNumber: z
    .string()
    .regex(/^(\d{4})?$/, { message: "계좌번호 끝 4자리를 입력하세요." })
    .optional(),
})

export type AccountFormValues = z.infer<typeof AccountFormSchema>
