import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod/v3"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/shared/components/ui/card"
import { LoginFormSchema } from "@/features/auth/schema"
import { Link } from "react-router-dom"
import { useLogin } from "@/features/auth/query"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"

export default function LoginForm() {
  const [mounted, setMounted] = useState(false)
  const { mutate: login } = useLogin()

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  function handleSubmit(values: z.infer<typeof LoginFormSchema>) {
    login(values)
  }

  return (
    <Card className="w-full px-10 pt-9 pb-8 sm:max-w-100">
      <CardContent className="p-0">
        <form id="login-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor="email"
                    className="font-semibold text-foreground"
                  >
                    이메일
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    placeholder="이메일을 입력하세요."
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="gap-1">
                  <FieldLabel
                    htmlFor="password"
                    className="font-semibold text-foreground"
                  >
                    비밀번호
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
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
            <Button className="w-full">로그인</Button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-center gap-0 text-[13px] text-muted-foreground">
          <Link
            to="/reset-password"
            className="underline-offset-2 hover:underline"
          >
            <p className="px-4">비밀번호 찾기</p>
          </Link>
          <span className="text-sm text-muted-foreground">|</span>
          <Link to="/register" className="underline-offset-2 hover:underline">
            <p className="px-4">회원가입</p>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
