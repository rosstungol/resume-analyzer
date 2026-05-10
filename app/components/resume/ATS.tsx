import { BadgeAlert, BadgeCheck, BadgeX } from 'lucide-react'

import type { Tip } from '@/data/types'

type ATSProps = {
	score: number
	tips: Pick<Tip, 'type' | 'tip'>[]
}

export function ATS({ score, tips }: ATSProps) {
	const tipsId = tips.map((item, index) => ({
		...item,
		id: ++index,
	}))

	const normalizedScore = Math.max(0, Math.min(100, Math.round(score)))
	const iconSrc =
		normalizedScore > 69 ? (
			<BadgeCheck aria-hidden='true' className='size-10 text-success' />
		) : normalizedScore > 49 ? (
			<BadgeAlert aria-hidden='true' className='size-10 text-warning' />
		) : (
			<BadgeX aria-hidden='true' className='size-10 text-destructive' />
		)
	const subtitle =
		normalizedScore > 69
			? 'Great Job!'
			: normalizedScore > 49
				? 'Good Start'
				: 'Needs Improvement'

	return (
		<div className='card card-shadow p-8'>
			<div className='mb-6 flex items-center gap-2 md:gap-4'>
				<div className='size-10'>{iconSrc}</div>
				<div>
					<h2 className='flex items-center gap-1 font-heading'>
						<span className='font-semibold text-2xl'>
							ATS Score - {normalizedScore}
						</span>
						<span className='text-muted-foreground text-sm'>/ 100</span>
					</h2>
				</div>
			</div>

			<div className='mb-6'>
				<h3 className='mb-2 font-semibold text-xl'>{subtitle}</h3>
				<p className='mb-4'>
					This score represents how well your resume is likely to perform in
					Applicant Tracking Systems used by employers.
				</p>

				<div className='space-y-3'>
					{tipsId.map((item) => (
						<div key={item.id} className='flex items-start gap-2'>
							<div className='size-6'>
								{item.type === 'good' ? (
									<BadgeCheck aria-hidden='true' className='text-success' />
								) : (
									<BadgeAlert aria-hidden='true' className='text-warning' />
								)}
							</div>

							<p>{item.tip}</p>
						</div>
					))}
				</div>
			</div>

			<p className='text-muted-foreground text-sm'>
				Keep refining your resume to improve your chances of getting past ATS
				filters and into the hands of recruiters.
			</p>
		</div>
	)
}
