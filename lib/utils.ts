import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number) {
  if (num >= 1e7) return (num / 1e7).toFixed(1).replace(/\.0$/, "") + "Cr";
  if (num >= 1e5) return (num / 1e5).toFixed(1).replace(/\.0$/, "") + "L";
  if (num >= 1e3) return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toString();
}
