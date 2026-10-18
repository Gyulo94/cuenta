import type { ReactNode } from "react"
import QueryProvider from "./query-provider"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import { Toaster } from "../components/ui/sonner"
import { TooltipProvider } from "../components/ui/tooltip"
import ModalProvider from "./modal-provider"

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      scriptProps={{ type: "application/json" }}
    >
      <QueryProvider>
        <Router>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
          <ModalProvider />
        </Router>
      </QueryProvider>
    </ThemeProvider>
  )
}
