import type { ButtonHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'destructive'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	type?: 'button' | 'submit' | 'reset'
	variant?: ButtonVariant
	fullWidth?: boolean
}

const baseStyles =
	'flex gap-2 rounded-lg border-2 border-mauve-600 p-4 transition-all font-heading font-semibold cursor-pointer'
const hoverStyles = 'hover:-translate-y-0.5 hover:card-shadow'
const disabledStyles = 'disabled:cursor-not-allowed disabled:opacity-50'

const variantStyles: Record<ButtonVariant, string> = {
	primary: 'bg-indigo-400 text-white',
	secondary: 'bg-white text-mauve-800',
	destructive: 'bg-rose-400 text-white',
}

export function Button({
	type = 'button',
	variant = 'primary',
	fullWidth = false,
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={cn(
				baseStyles,
				hoverStyles,
				disabledStyles,
				variantStyles[variant],
				fullWidth && 'w-full',
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}
