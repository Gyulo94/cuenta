import type { ReactNode } from "react"
import QueryProvider from "./query-provider"
import { BrowserRouter as Router } from "react-router-dom"
import { ThemeProvider } from "next-themes"
import { Toaster } from "../components/ui/sonner"
import { TooltipProvider } from "../components/ui/tooltip"

interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryProvider>
        <Router>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </Router>
      </QueryProvider>
    </ThemeProvider>
  )
}
