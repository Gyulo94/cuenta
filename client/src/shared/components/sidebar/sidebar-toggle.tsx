import { Link } from "react-router-dom"
import { Icon } from "@/shared/components/ui/icon"
import { Button } from "@/shared/components/ui/button"
import {
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from "@/shared/components/ui/sidebar"

/**
 * 사이드바 상단 로고와 접기·펴기 버튼
 *
 * @returns 펼침: 로고와 접기 버튼, 접힘: 펴기 버튼이 되는 로고
 */
export function SidebarToggle() {
  const { state, isMobile, toggleSidebar } = useSidebar()
  const collapsed = state === "collapsed" && !isMobile

  return (
    <SidebarHeader className="h-16 flex-row items-center justify-between border-b px-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2">
      {collapsed ? (
        <Button
          variant="ghost"
          size="icon"
          aria-label="사이드바 열기"
          onClick={toggleSidebar}
          className="size-10 hover:bg-sidebar-accent"
        >
          <Icon.logo className="size-7" />
        </Button>
      ) : (
        <>
          <Link to="/dashboard" className="flex items-center gap-2">
            <Icon.logo className="size-7" />
            <span className="text-xl font-semibold">Cuenta</span>
          </Link>
          <SidebarTrigger className="size-10 hover:bg-sidebar-accent [&_svg]:size-5" />
        </>
      )}
    </SidebarHeader>
  )
}
