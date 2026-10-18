import { useLocation } from "react-router-dom"
import { format } from "date-fns"

import { NAV_ITEMS } from "@/shared/lib/constants"
import { UserMenu } from "./user-menu"
import ModeToggle from "./mode-toggle"

/**
 * 앱 헤더
 *
 * @returns 페이지 제목, 다크 모드, 프로필 메뉴
 */
export function Navbar() {
  const { pathname } = useLocation()

  const current = NAV_ITEMS.find((item) => pathname.startsWith(item.url))
  const isDashboard = current?.url === "/dashboard"

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b px-6">
      <h1 className="text-lg font-semibold">{current?.title}</h1>
      {isDashboard && (
        <span className="text-sm text-muted-foreground">
          {format(new Date(), "yyyy년 M월")}
        </span>
      )}

      <div className="ml-auto flex items-center gap-2">
        <ModeToggle />
        <UserMenu />
      </div>
    </header>
  )
}
