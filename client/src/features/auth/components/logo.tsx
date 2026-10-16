import { Icon } from "@/shared/components/ui/icon"
import { cn } from "@/shared/lib/utils"

interface LogoProps {
  title?: string
  description?: string
}

export default function Logo({ title, description }: LogoProps) {
  return (
    <div className="mb-7 flex flex-col items-center">
      <div className="flex size-30 items-center justify-center rounded-2xl">
        <Icon.logo />
      </div>
      <h1
        className={cn(
          "text- mb-1.5 text-[24px]",
          title ? "font-semibold" : "font-bold"
        )}
      >
        {title || "Cuenta"}
      </h1>
      <p className="out-of-range: text-muted-foreground">
        {description || "매일 조금씩, 똑똑해지는 나의 소비 습관"}
      </p>
    </div>
  )
}
