import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { type JSX, useState } from "react"

export function useConfirm(
  title: string,
  message: string
): [JSX.Element, () => Promise<boolean>] {
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void
  } | null>(null)

  const confirm = () =>
    new Promise<boolean>((resolve) => {
      setPromise({ resolve })
    })

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const confirmationDialog = (
    <Dialog open={promise !== null} onOpenChange={handleCancel}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-2">
          <Button
            onClick={handleCancel}
            variant="outline"
            className="cursor-pointer"
          >
            취소
          </Button>
          <Button onClick={handleConfirm} className="cursor-pointer">
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [confirmationDialog, confirm]
}
