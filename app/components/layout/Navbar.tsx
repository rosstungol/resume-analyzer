import type { ReactNode } from 'react'
import { Link } from 'react-router'

export function Navbar({ children }: { children?: ReactNode }) {
	return (
		<nav className='card card-shadow flex h-20 w-full items-center justify-between px-5 py-3'>
			<Link to='/' className='font-black font-heading text-4xl text-mauve-800'>
				resmyze
			</Link>
			<div className='flex gap-2'>{children}</div>
		</nav>
	)
}
