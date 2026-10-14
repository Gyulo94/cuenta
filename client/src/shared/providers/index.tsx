import type { ReactNode } from "react"
import QueryProvider from "./query-provider"
import { BrowserRouter as Router } from "react-router-dom"
import { Toaster } from "../components/ui/sonner"

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <Router>
        {children}
        <Toaster />
      </Router>
    </QueryProvider>
  )
}
