import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatSize(bytes: number): string {
	if (bytes === 0) return '0 bytes'

	const k = 1024
	const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB']

	const i: number = Math.floor(Math.log(bytes) / Math.log(k))

	return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]} `
}
