import { Link } from 'react-router'

import { ScoreCircle } from '../ui/ScoreCircle'

type GridItemProps = {
	href: string
	title?: string
	subtitle?: string
	score: number
}

export function GridItem({ href, title, subtitle, score }: GridItemProps) {
	return (
		<li className='card card-shadow transition-all'>
			<Link
				to={href}
				className='flex cursor-pointer items-center gap-2 p-4'
				aria-label={title ?? 'Resume'}
			>
				<ScoreCircle score={score} />
				<div>
					{title && <h3 className='font-heading text-xl'>{title}</h3>}
					{subtitle && (
						<p className='text-muted-foreground text-sm'>{subtitle}</p>
					)}
				</div>
			</Link>
		</li>
	)
}
