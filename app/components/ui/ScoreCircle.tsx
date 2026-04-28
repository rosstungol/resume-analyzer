import { cn } from '@/lib/utils'

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
				<defs>
					<linearGradient id='grad' x1='1' y1='0' x2='0' y2='1'>
						<stop offset='0%' stopColor='#f2e5e5' />
						<stop offset='100%' stopColor='#ce7777' />
					</linearGradient>
				</defs>
				<circle
					cx='50'
					cy='50'
					r={normalizedRadius}
					stroke='url(#grad)'
					strokeWidth={stroke}
					fill='transparent'
					strokeDasharray={circumference}
					strokeDashoffset={strokeDashoffset}
					strokeLinecap='round'
				/>
			</svg>

			<div className='absolute inset-0 flex-center flex-col'>
				<div className='flex flex-col items-center font-heading'>
					<p
						className={cn(
							'font-semibold',
							size === 'sm' ? 'text-3xl' : 'text-5xl'
						)}
					>
						{clampedScore}
					</p>
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
