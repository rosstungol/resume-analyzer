import clsx from 'clsx'

export function ScoreBadge({ score }: { score: number }) {
	let badgeText = ''
	let badgeColor = ''

	if (score > 70) {
		badgeText = 'Excellent'
		badgeColor = 'bg-green-300 border-green-600'
	} else if (score > 49) {
		badgeText = 'Good'
		badgeColor = 'bg-yellow-300 border-yellow-600'
	} else {
		badgeText = 'Needs work'
		badgeColor = 'bg-amber-300 border-amber-600'
	}

	return (
		<div
			className={clsx(
				'inline-block rounded-lg border px-2 py-1 font-semibold text-gray-700 text-sm',
				badgeColor
			)}
		>
			<p>{badgeText}</p>
		</div>
	)
}
