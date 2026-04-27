import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStatusColor(status: 'normal' | 'moderate' | 'at-risk') {
  switch (status) {
    case 'normal':   return { text: 'text-safe',     bg: 'bg-safe/10',     border: 'border-safe/30',     hex: '#22c55e' };
    case 'moderate': return { text: 'text-moderate', bg: 'bg-moderate/10', border: 'border-moderate/30', hex: '#f59e0b' };
    case 'at-risk':  return { text: 'text-risk',     bg: 'bg-risk/10',     border: 'border-risk/30',     hex: '#ef4444' };
  }
}

export function getStatusLabel(status: 'normal' | 'moderate' | 'at-risk') {
  switch (status) {
    case 'normal':   return 'Normal';
    case 'moderate': return 'Monitor';
    case 'at-risk':  return 'At-Risk';
  }
}
