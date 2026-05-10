import { ScoreBadge } from '../ui/ScoreBadge'
import { StatusIcon } from './StatusIcon'

type CategoryHeaderProps = {
	title: string
	categoryScore: number
}

export function CategoryHeader({ title, categoryScore }: CategoryHeaderProps) {
	const normalizedScore = Number.isFinite(categoryScore)
		? Math.max(0, Math.min(100, Math.round(categoryScore)))
		: 0

	return (
		<div className='flex gap-2 py-2 md:items-center md:gap-4'>
			<div className='p-1'>
				<StatusIcon type={normalizedScore > 69 ? 'good' : 'improve'} />
			</div>
			<div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-6'>
				<h2 className='flex items-center gap-2 font-heading'>
					<span className='font-semibold text-2xl'>
						{title} - {normalizedScore}
					</span>
					<span className='text-muted-foreground text-sm'>/ 100</span>
				</h2>

				<ScoreBadge score={normalizedScore} />
			</div>
		</div>
	)
}
