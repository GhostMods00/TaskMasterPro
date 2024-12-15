import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  const merged = clsx(inputs);
  return merged.split(' ').filter(Boolean).join(' ');
}

export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
};