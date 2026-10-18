import { useState } from "react"
import { Outlet } from "react-router-dom"
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "@/shared/components/sidebar/app-sidebar"
import { Navbar } from "@/shared/components/navbar/navbar"

const SIDEBAR_STORAGE_KEY = "cuenta:sidebar-open"

/**
 * 저장된 사이드바 펼침 상태 읽기
 *
 * @returns 펼침 여부, 저장된 값이 없으면 true
 */
function readSidebarOpen() {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) !== "false"
  } catch {
    return true
  }
}

/**
 * 사이드바 펼침 상태 저장
 *
 * @param open 펼침 여부
 */
function saveSidebarOpen(open: boolean) {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open))
  } catch {
    return
  }
}

/**
 * 사이드바 레이아웃
 *
 * @returns 사이드바, 헤더와 하위 페이지
 */
export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(readSidebarOpen)

  function handleSidebarOpenChange(open: boolean) {
    setSidebarOpen(open)
    saveSidebarOpen(open)
  }

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={handleSidebarOpenChange}>
      <AppSidebar />
      <SidebarInset>
        <Navbar />
        <main className="flex-1 p-6">
          <div className="mx-auto w-full max-w-content">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
