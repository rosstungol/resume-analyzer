import type { ReactNode } from 'react'
import { Link } from 'react-router'

export function Navbar({ children }: { children?: ReactNode }) {
	return (
		<nav className='card card-shadow flex h-fit min-h-18 w-full flex-col items-center justify-between gap-4 py-2 md:flex-row md:px-5'>
			<Link to='/'>
				<h1 className='font-black font-heading text-4xl text-accent-foreground text-stroke [text-shadow:3px_3px_0px_rgba(70,57,71,1)]'>
					resmyze
				</h1>
			</Link>
			<div className='flex gap-2'>{children}</div>
		</nav>
	)
}
