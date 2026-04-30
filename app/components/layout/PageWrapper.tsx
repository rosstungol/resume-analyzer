import type { ReactNode } from 'react'

import { DotGrid } from './DotGrid'

export function PageWrapper({ children }: { children: ReactNode }) {
	return (
		<div className='relative h-full'>
			<div
				className='pointer-events-none fixed top-0 left-0 z-10 h-screen w-full'
				aria-hidden='true'
			>
				<DotGrid
					dotSize={2}
					gap={16}
					baseColor='#d7d0d7'
					activeColor='#705ecb'
					proximity={120}
					shockRadius={250}
					shockStrength={5}
					resistance={750}
					returnDuration={1.5}
				/>
			</div>
			<div className='container relative z-20 m-auto px-4 py-5'>{children}</div>
		</div>
	)
}
