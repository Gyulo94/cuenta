import {
  LoginPage,
  RegisterPage,
  RegisterVerifyPage,
  ResetPasswordPage,
  ResetPasswordVerifyPage,
} from "@/features/auth/pages"
import { Route, Routes } from "react-router-dom"
import { DashboardPage, MainPage, NotFoundPage } from "@/shared/pages"
import PublicRoute from "@/shared/routes/public-route"
import PrivateRoute from "./routes/private-route"
import AppLayout from "@/shared/layouts/app-layout"

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route element={<PublicRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
        <Route path="register/verify" element={<RegisterVerifyPage />} />
        <Route
          path="reset-password/verify"
          element={<ResetPasswordVerifyPage />}
        />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
