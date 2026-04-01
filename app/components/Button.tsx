import clsx from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary'
type ButtonSize = 'md' | 'sm'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant
	size?: ButtonSize
	fullWidth?: boolean
}

const baseStyles =
	'flex-center cursor-pointer rounded-lg border font-bold font-roboto'
const hoverStyles = 'transition-colors hover:bg-violet-300 hover:text-gray-950'
const disabledStyles =
	'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-200'

const variantStyles: Record<ButtonVariant, string> = {
	primary: 'border-violet-300',
	secondary: 'border-violet-500/10 hover:border-violet-300',
}

const sizeStyles: Record<ButtonSize, string> = {
	sm: 'p-2 text-xs',
	md: 'p-4 gap-2 text-sm',
}

export function Button({
	variant = 'primary',
	size = 'md',
	fullWidth = false,
	className,
	children,
	...props
}: ButtonProps) {
	return (
		<button
			type='button'
			className={clsx(
				baseStyles,
				hoverStyles,
				disabledStyles,
				variantStyles[variant],
				sizeStyles[size],
				fullWidth && 'w-full',
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}
