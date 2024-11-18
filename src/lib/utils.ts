import { clsx, type ClassValue } from 'clsx';
import type { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
