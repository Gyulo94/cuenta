import AuthLayout from "@/features/auth/components/layout"
import RegisterForm from "@/features/auth/components/form/register-form"
import Logo from "@/features/auth/components/logo"

export default function RegisterPage() {
  return (
    <AuthLayout>
      <div className="flex w-full flex-col items-center">
        <Logo
          title="회원가입"
          description="기본 정보를 입력해 새 계정을 만들어 주세요."
        />
        <RegisterForm />
      </div>
    </AuthLayout>
  )
}
