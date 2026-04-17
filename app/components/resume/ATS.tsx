import { BadgeAlert, BadgeCheck, BadgeX } from 'lucide-react'

import { cn } from '@/lib/utils'

type Suggestion = {
	type: 'good' | 'improve'
	tip: string
}

type ATSProps = {
	score: number
	suggestions: Suggestion[]
}

export function ATS({ score, suggestions }: ATSProps) {
	const bgClass =
		score > 69 ? 'bg-green-100' : score > 49 ? 'bg-yellow-100' : 'bg-red-100'

	const iconSrc =
		score > 69 ? <BadgeCheck /> : score > 49 ? <BadgeAlert /> : <BadgeX />

	const subtitle =
		score > 69 ? 'Great Job!' : score > 49 ? 'Good Start' : 'Needs Improvement'

	return (
		<div
			className={cn(
				'w-full rounded-lg border border-mauve-600 p-6 shadow-md',
				bgClass
			)}
		>
			<div className='mb-6 flex items-center gap-4'>
				{iconSrc}
				<div>
					<h2 className='flex items-center gap-2'>
						<span className='font-semibold text-2xl'>ATS Score - {score}</span>
						<span className='text-mauve-400 text-sm'>/ 100</span>
					</h2>
				</div>
			</div>

			<div className='mb-6'>
				<h3 className='mb-2 font-semibold text-xl'>{subtitle}</h3>
				<p className='mb-4 text-mauve-600'>
					This score represents how well your resume is likely to perform in
					Applicant Tracking Systems used by employers.
				</p>

				<div className='space-y-3'>
					{suggestions.map((suggestion) => (
						<div key={suggestion.tip} className='flex items-start gap-3'>
							{suggestion.type === 'good' ? <BadgeCheck /> : <BadgeAlert />}

							<p
								className={
									suggestion.type === 'good'
										? 'text-green-700'
										: 'text-amber-700'
								}
							>
								{suggestion.tip}
							</p>
						</div>
					))}
				</div>
			</div>

			<p className='text-mauve-700 italic'>
				Keep refining your resume to improve your chances of getting past ATS
				filters and into the hands of recruiters.
			</p>
		</div>
	)
}
