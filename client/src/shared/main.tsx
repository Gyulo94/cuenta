import { createRoot } from "react-dom/client"

import "./globals.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/shared/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
      <App />
    </ThemeProvider>
)
