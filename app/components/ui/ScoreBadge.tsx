import { cn } from '@/lib/utils'

export function ScoreBadge({ score }: { score: number }) {
	const clampedScore = Number.isFinite(score)
		? Math.max(0, Math.min(100, score))
		: 0

	let badgeText = ''
	let badgeColor = ''

	if (clampedScore > 69) {
		badgeText = 'Excellent'
		badgeColor = 'bg-green-300 border-green-600'
	} else if (clampedScore > 49) {
		badgeText = 'Good'
		badgeColor = 'bg-yellow-300 border-yellow-600'
	} else {
		badgeText = 'Needs work'
		badgeColor = 'bg-amber-300 border-amber-600'
	}

	return (
		<div
			className={cn(
				'inline-block rounded-lg border px-2 py-1 font-semibold text-mauve-700 text-sm',
				badgeColor
			)}
		>
			<p>{badgeText}</p>
		</div>
	)
}
