import { cn } from '@/lib/utils'

export function ScoreBadge({ score }: { score: number }) {
	const clampedScore = Number.isFinite(score)
		? Math.max(0, Math.min(100, score))
		: 0

	let badgeText = ''
	let badgeColor = ''

	if (clampedScore > 69) {
		badgeText = 'Excellent'
		badgeColor = 'bg-green-300'
	} else if (clampedScore > 49) {
		badgeText = 'Good'
		badgeColor = 'bg-yellow-300'
	} else {
		badgeText = 'Needs work'
		badgeColor = 'bg-red-200 border-red-600'
	}

	return (
		<div
			className={cn(
				'inline-block rounded-full px-2 py-1 font-bold text-xs',
				badgeColor
			)}
		>
			<p>{badgeText}</p>
		</div>
	)
}
