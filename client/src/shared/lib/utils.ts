import { clsx, twMerge, type ClassValue } from "cn"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}