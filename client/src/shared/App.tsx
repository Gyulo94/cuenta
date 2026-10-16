import { LoginPage, RegisterPage, RegisterVerifyPage, ResetPasswordPage, ResetPasswordVerifyPage } from "@/features/auth/pages"
import { Route, Routes } from "react-router-dom"

export function App() {
  return (
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="register/verify" element={<RegisterVerifyPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="reset-password" element={<ResetPasswordPage />} />
      <Route
        path="reset-password/verify"
        element={<ResetPasswordVerifyPage />}
      />
    </Routes>
  )
}

export default App
