import { BadgeAlert, BadgeCheck, BadgeX } from 'lucide-react'

type Suggestion = {
	type: 'good' | 'improve'
	tip: string
}

type ATSProps = {
	score: number
	suggestions: Suggestion[]
}

export function ATS({ score, suggestions }: ATSProps) {
	const iconSrc =
		score > 69 ? (
			<BadgeCheck className='size-10 text-green-600' />
		) : score > 49 ? (
			<BadgeAlert className='size-10 text-yellow-500' />
		) : (
			<BadgeX className='size-10 text-red-400' />
		)

	const subtitle =
		score > 69 ? 'Great Job!' : score > 49 ? 'Good Start' : 'Needs Improvement'

	return (
		<div className='card card-shadow p-8'>
			<div className='mb-6 flex items-center gap-4'>
				{iconSrc}
				<div>
					<h2 className='flex items-center gap-1'>
						<span className='font-semibold text-2xl'>ATS Score - {score}</span>
						<span className='text-muted-foreground text-xs'>/ 100</span>
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
					{suggestions.map((suggestion) => (
						<div key={suggestion.tip} className='flex items-start gap-3'>
							{suggestion.type === 'good' ? (
								<BadgeCheck className='text-green-600' />
							) : (
								<BadgeAlert className='text-yellow-500' />
							)}

							<p>{suggestion.tip}</p>
						</div>
					))}
				</div>
			</div>

			<p className='text-sm'>
				Keep refining your resume to improve your chances of getting past ATS
				filters and into the hands of recruiters.
			</p>
		</div>
	)
}
