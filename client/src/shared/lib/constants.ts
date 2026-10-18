import {
  CalendarDays,
  CreditCard,
  LayoutDashboard,
  ReceiptText,
  Tags,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  title: string
  url: string
  icon: LucideIcon
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "개요",
    items: [{ title: "대시보드", url: "/dashboard", icon: LayoutDashboard }],
  },
  {
    title: "가계부",
    items: [
      { title: "수입/지출 내역", url: "/transactions", icon: ReceiptText },
      { title: "캘린더", url: "/calendar", icon: CalendarDays },
      { title: "카드·계좌", url: "/accounts", icon: CreditCard },
      { title: "카테고리", url: "/categories", icon: Tags },
    ],
  },
]

export const NAV_ITEMS: NavItem[] = NAV_GROUPS.flatMap((group) => group.items)

export const DEFAULT_AVATAR = "/default-avatar.jpg"
