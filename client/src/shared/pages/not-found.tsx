import { AlertTriangle } from "lucide-react"
import { Button } from "@/shared/components/ui/button"

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-4 p-6">
        <AlertTriangle className="size-6 text-muted-foreground" />
        <p className="text-center text-sm text-muted-foreground">
          404: 해당 페이지를 찾을 수 없습니다.
        </p>
        <Button
          variant={"default"}
          size={"sm"}
          onClick={() => (window.location.href = "/")}
        >
          홈으로
        </Button>
      </div>
    </div>
  )
}
