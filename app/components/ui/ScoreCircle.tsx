import { cn, scoreColor } from '@/lib/utils'

export function ScoreCircle({
	score = 75,
	size,
}: {
	score: number
	size: 'sm' | 'lg'
}) {
	const clampedScore = Number.isFinite(score)
		? Math.max(0, Math.min(100, score))
		: 0
	const radius = 40
	const stroke = 10
	const normalizedRadius = radius - stroke / 2
	const circumference = 2 * Math.PI * normalizedRadius
	const progress = clampedScore / 100
	const strokeDashoffset = circumference * (1 - progress)

	return (
		<div className={cn('relative', size === 'sm' ? 'size-32' : 'size-48')}>
			<svg
				height='100%'
				width='100%'
				viewBox='0 0 100 100'
				className='-rotate-90 transform'
			>
				<title>Score</title>
				<circle
					cx='50'
					cy='50'
					r={normalizedRadius}
					stroke='#f3f1f3'
					strokeWidth={stroke}
					fill='transparent'
				/>
				<circle
					cx='50'
					cy='50'
					r={normalizedRadius}
					stroke={scoreColor(clampedScore)}
					strokeWidth={stroke}
					fill='transparent'
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap='round'
				/>
			</svg>

			<div className='absolute inset-0 flex-center flex-col'>
				<div className='flex flex-col items-center font-heading'>
					<div className='text-stroke-sm'>
						<p
							className={cn(
								'font-bold [text-shadow:1px_1px_0px_rgba(0,0,0,1)]',
								size === 'sm' ? 'text-4xl' : 'text-6xl',
								`text-[${scoreColor(clampedScore)}]`
							)}
						>
							{clampedScore}
						</p>
					</div>
					<p
						className={cn(
							'text-muted-foreground',
							size === 'sm' ? 'text-xs' : 'text-lg'
						)}
					>
						/ 100
					</p>
				</div>
			</div>
		</div>
	)
}
