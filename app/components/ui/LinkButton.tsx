import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { cn } from '@/lib/utils'

type LinkButtonVariant = 'primary' | 'secondary'

type LinkButtonProps = {
	variant?: LinkButtonVariant
	fileRoute?: boolean
	href: string
	children: ReactNode
}

const baseStyles =
	'flex-center gap-2 rounded-lg border-2 px-2 py-3  transition-all font-semibold font-heading cursor-pointer'
const hoverStyles = 'hover:-translate-y-0.5 hover:card-shadow'
const variantStyles: Record<LinkButtonVariant, string> = {
	primary: 'bg-primary text-primary-foreground',
	secondary: 'bg-secondary text-secondary-foreground',
}

export function LinkButton({
	variant = 'secondary',
	href,
	fileRoute = false,
	children,
}: LinkButtonProps) {
	const link = fileRoute ? (
		<a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className={cn(baseStyles, hoverStyles, variantStyles[variant])}
		>
			{children}
		</a>
	) : (
		<Link
			to={href}
			className={cn(baseStyles, hoverStyles, variantStyles[variant])}
		>
			{children}
		</Link>
	)

	return link
}
