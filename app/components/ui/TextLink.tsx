import type { ReactNode } from 'react'
import { Link } from 'react-router'

type TextLinkProps = {
	href: string
	children: ReactNode
}

export function TextLink({ href, children }: TextLinkProps) {
	return (
		<Link to={href} className='flex items-center text-muted-foreground'>
			{children}
		</Link>
	)
}
