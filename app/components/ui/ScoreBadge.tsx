import { cn } from '@/lib/utils'

export function ScoreBadge({ score }: { score: number }) {
	const clampedScore = Number.isFinite(score)
		? Math.max(0, Math.min(100, score))
		: 0

	let badgeText = ''
	let badgeColor = ''

	if (clampedScore > 69) {
		badgeText = 'Excellent'
		badgeColor = 'bg-success'
	} else if (clampedScore > 49) {
		badgeText = 'Good'
		badgeColor = 'bg-warning'
	} else {
		badgeText = 'Needs work'
		badgeColor = 'bg-destructive'
	}

	return (
		<div
			className={cn(
				'inline-block h-fit w-fit rounded-full px-2 py-1 font-semibold text-stroke-sm text-white text-xs',
				badgeColor
			)}
		>
			<p className='text-stroke-sm'>{badgeText}</p>
		</div>
	)
}
