import { Card, CardContent } from "@/shared/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/shared/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod/v3"
import { useRegister } from "@/features/auth/query"
import { RegisterFormSchema } from "@/features/auth/schema"
import PasswordIndicator from "../password-indicator"
import { Link } from "react-router-dom"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"

export default function RegisterForm() {
  const { mutate: register } = useRegister()
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  })

  function handleSubmit(values: z.infer<typeof RegisterFormSchema>) {
    register(values)
  }

  return (
    <Card className="w-full px-10 sm:max-w-lg">
      <CardContent className="p-0">
        <form id="register-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup className="gap-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel htmlFor="name" className="font-semibold">
                    이름
                  </FieldLabel>
                  <Input
                    {...field}
                    id="name"
                    placeholder="이름"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="gap-2">
                  <FieldLabel htmlFor="email" className="font-semibold">
                    이메일
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    placeholder="이메일"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="flex items-start gap-2">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex-1 gap-2">
                    <FieldLabel htmlFor="password" className="font-semibold">
                      비밀번호
                    </FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="비밀번호"
                      autoComplete="off"
                    />
                    <div className="text-xs">
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex-1 gap-2">
                    <FieldLabel
                      htmlFor="confirmPassword"
                      className="font-semibold"
                    >
                      비밀번호 확인
                    </FieldLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      placeholder="비밀번호 확인"
                      autoComplete="off"
                    />
                    <div className="text-xs">
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </div>
                  </Field>
                )}
              />
            </div>

            <PasswordIndicator value={form.watch("password")} />
          </FieldGroup>

          <div className="mt-4">
            <Button className="w-full">회원가입</Button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-center text-[13px] text-muted-foreground">
          <Link to="/login" className="underline-offset-2 hover:underline">
            <p className="px-1">로그인</p>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
