// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx";
const twMerge = require("tailwind-merge");  // Using require instead of import

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};