import { cn } from "@/shared/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import { Skeleton } from "./skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { DEFAULT_AVATAR } from "@/shared/lib/constants"

interface UserAvatarProps {
  name: string
  url?: string
  size?:
    "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"
  className?: string
  isTooltipEnabled?: boolean
  onClick?: () => void
}

export default function UserAvatar({
  name,
  url,
  size,
  className,
  isTooltipEnabled = true,
  onClick,
}: UserAvatarProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar
          className={cn(
            "pointer-events-auto size-8 border shadow-md hover:z-10",
            size === "sm" && "size-6",
            size === "md" && "size-8",
            size === "lg" && "size-10",
            size === "xl" && "size-14",
            size === "2xl" && "size-16",
            size === "3xl" && "size-20",
            size === "4xl" && "size-24",
            size === "5xl" && "size-28",
            size === "6xl" && "size-32",
            size === "7xl" && "size-36",
            className
          )}
          onClick={onClick}
        >
          <AvatarImage
            src={url || DEFAULT_AVATAR}
            alt={name}
            className="object-cover object-center"
          />
          <AvatarFallback>
            <Skeleton className="size-full rounded-full" />
          </AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      {isTooltipEnabled && (
        <TooltipContent>
          <p>{name.toUpperCase()}</p>
        </TooltipContent>
      )}
    </Tooltip>
  )
}
