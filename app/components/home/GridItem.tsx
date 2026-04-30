import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router'

import { ScoreCircle } from '../ui/ScoreCircle'

type GridItemProps = {
	href: string
	title: string
	subtitle: string
	score: number
}

export function GridItem({ href, title, subtitle, score }: GridItemProps) {
	return (
		<li className='card card-shadow overflow-hidden transition-all'>
			<Link
				to={href}
				className='relative flex cursor-pointer flex-col items-center gap-2 p-4 sm:flex-row'
				aria-label={title ?? 'Resume'}
			>
				<div className='size-32'>
					<ScoreCircle score={score} size='sm' />
				</div>
				<div>
					<h3 className='max-w-60 truncate font-heading font-semibold text-2xl xl:max-w-80'>
						{title}
					</h3>
					<p className='max-w-60 truncate text-muted-foreground xl:max-w-80'>
						{subtitle}
					</p>
				</div>
				<ArrowUpRight className='absolute top-3 right-3 size-8 text-muted-foreground' />
			</Link>
		</li>
	)
}
