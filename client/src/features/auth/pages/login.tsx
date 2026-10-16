import Logo from "@/features/auth/components/logo"
import LoginForm from "@/features/auth/components/form/login-form"

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <Logo
        title="로그인"
        description="이메일과 비밀번호를 입력해 로그인해 주세요."
      />
      <LoginForm />
    </div>
  )
}
