import { Card, CardContent } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Controller, useForm } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v3"
import { Link } from "react-router-dom"
import { EmailFormSchema } from "@/features/auth/schema"
import { Input } from "@/shared/components/ui/input"
import { useSendResetPasswordMail } from "@/features/auth/query"

export default function EmailForm() {
  const { mutate: sendResetPasswordMail } = useSendResetPasswordMail()
  const form = useForm<z.infer<typeof EmailFormSchema>>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: "",
    },
  })

  function handleSubmit(values: z.infer<typeof EmailFormSchema>) {
    sendResetPasswordMail(values.email)
  }

  return (
    <Card className="w-full px-10 pt-9 pb-8 sm:max-w-md">
      <CardContent className="p-0">
        <form
          id="reset-password-form"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-2">
                <FieldLabel htmlFor="email" className="font-semibold">
                  이메일
                </FieldLabel>
                <Input {...field} id="email" type="email" autoComplete="off" />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <div className="mt-4">
            <Button className="w-full" type="submit">
              재설정 메일 발송
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
