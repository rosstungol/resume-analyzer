import type { ReactNode } from 'react'
import { Link } from 'react-router'

import { usePuterStore } from '@/lib/puter'
import { cn } from '@/lib/utils'

export function Navbar({ children }: { children?: ReactNode }) {
	const auth = usePuterStore((state) => state.auth)

	return (
		<nav
			className={cn(
				'card card-shadow flex h-fit w-full flex-col items-center justify-between py-2 md:min-h-18 md:flex-row md:px-5',
				auth.isAuthenticated && 'gap-4'
			)}
		>
			<Link to='/'>
				<h1 className='heading-shadow font-black font-heading text-4xl text-accent-foreground text-stroke'>
					resmyze
				</h1>
			</Link>
			{children && <div className='flex gap-2'>{children}</div>}
		</nav>
	)
}
