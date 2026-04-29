import { ScoreBadge } from '../ui/ScoreBadge'
import { StatusIcon } from './StatusIcon'

export function CategoryHeader({
	title,
	categoryScore,
}: {
	title: string
	categoryScore: number
}) {
	return (
		<div className='flex gap-2 py-2 md:items-center md:gap-4'>
			<div className='p-1'>
				<StatusIcon type={categoryScore > 69 ? 'good' : 'improve'} />
			</div>
			<div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-6'>
				<h2 className='flex items-center gap-2'>
					<span className='font-semibold text-2xl'>
						{title} - {categoryScore}
					</span>
					<span className='text-muted-foreground text-sm'>/ 100</span>
				</h2>

				<ScoreBadge score={categoryScore} />
			</div>
		</div>
	)
}
