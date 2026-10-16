import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Controller, useForm } from "react-hook-form"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v3"
import PasswordIndicator from "../password-indicator"
import { Link } from "react-router-dom"
import { ResetPasswordFormSchema } from "@/features/auth/schema"
import { useResetPassword } from "@/features/auth/query"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import Logo from "../logo"

interface ResetPasswordFormProps {
  token?: string
  email?: string
}

export default function ResetPasswordForm({
  token,
  email,
}: ResetPasswordFormProps) {
  const { mutate: resetPassword } = useResetPassword()
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: email || "",
      token: token || "",
      newPassword: "",
      confirmNewPassword: "",
    },
  })

  function handleSubmit(values: z.infer<typeof ResetPasswordFormSchema>) {
    resetPassword(values)
  }

  return (
    <Card className="w-full px-10 pt-9 pb-8 sm:max-w-md">
      <CardContent className="p-0">
        <CardHeader>
          <Logo
            title="비밀번호 재설정"
            description="새로운 비밀번호를 입력해 주세요."
          />
        </CardHeader>

        <form
          id="reset-password-form"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FieldGroup>
            <Controller
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel htmlFor="newPassword" className="font-semibold">
                    새 비밀번호
                  </FieldLabel>
                  <Input
                    {...field}
                    id="newPassword"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    autoComplete="off"
                  />

                  <PasswordIndicator value={field.value} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmNewPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-1">
                  <FieldLabel
                    htmlFor="confirmNewPassword"
                    className="font-semibold"
                  >
                    비밀번호 확인
                  </FieldLabel>
                  <Input
                    {...field}
                    id="confirmNewPassword"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <div className="mt-4">
            <Button className="w-full" type="submit">
              비밀번호 재설정
            </Button>
          </div>
        </form>

        <div className="mt-4 flex cursor-pointer items-center justify-center text-[13px] text-muted-foreground transition-colors duration-180 hover:text-primary">
          <Link to="/login">
            <p className="underline-offset-2 hover:underline">로그인</p>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
