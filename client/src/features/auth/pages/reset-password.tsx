import EmailForm from "@/features/auth/components/form/email-form"
import Logo from "@/features/auth/components/logo"

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Logo
        title="비밀번호 찾기"
        description="가입한 이메일을 입력해 비밀번호를 재설정해 주세요."
      />
      <EmailForm />
    </div>
  )
}
