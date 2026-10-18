import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import UserAvatar from "../ui/user-avatar"

import { LogOut, User as UserIcon } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { DEFAULT_AVATAR } from "@/shared/lib/constants"
import { useSession } from "@/features/user/query"
import { useLogout } from "@/features/auth/query"

export function UserMenu() {
  const { data: session } = useSession()
  const { mutate: logout } = useLogout()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative size-8 rounded-full border-2 border-background p-0 shadow-sm transition-all hover:shadow-md"
          >
            <UserAvatar
              name={session?.name || "사용자"}
              url={session?.image || DEFAULT_AVATAR}
              isTooltipEnabled={false}
              className="size-full"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-lg p-2"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm leading-none font-bold">
                {session?.name || "사용자"}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.email || "test@example.com"}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="opacity-50" />
          <DropdownMenuItem
            className="cursor-pointer rounded-lg py-2.5 focus:bg-accent focus:text-accent-foreground"
            onClick={() => {}}
          >
            <UserIcon className="mr-2 size-4" />
            <span>프로필 편집</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="cursor-pointer rounded-lg py-2.5"
            onClick={() => logout()}
          >
            <LogOut className="mr-2 size-4" />
            <span>로그아웃</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
