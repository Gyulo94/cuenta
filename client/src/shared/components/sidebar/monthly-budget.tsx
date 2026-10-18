import { Pencil } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

/**
 * 사이드바 월 예산 요약
 *
 * @returns 월 예산 문구와 수정 버튼
 */
export function MonthlyBudget() {
  return (
    <div className="flex items-center justify-between border-b px-4 py-3 group-data-[collapsible=icon]:hidden">
      <p className="text-sm text-muted-foreground">월 예산을 등록해주세요.</p>
      <Button
        variant="ghost"
        size="icon"
        aria-label="월 예산 수정"
        className="text-muted-foreground"
      >
        <Pencil size={20} />
      </Button>
    </div>
  )
}
