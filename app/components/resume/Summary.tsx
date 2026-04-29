import type { Feedback } from '@/data/types'
import { ScoreBadge } from '../ui/ScoreBadge'
import { ScoreCircle } from '../ui/ScoreCircle'

type CategoryProps = {
	title: string
	score: number
}

function Category({ title, score }: CategoryProps) {
	return (
		<div>
			<div className='flex justify-between'>
				<div>
					<h3 className='font-semibold text-lg'>{title}</h3>
					<ScoreBadge score={score} />
				</div>
				<p className='flex items-center gap-1'>
					<span className='font-semibold text-2xl'>{score}</span>
					<span className='text-muted-foreground text-xs'>/ 100</span>
				</p>
			</div>
		</div>
	)
}

export function Summary({
	jobTitle,
	companyName,
	feedback,
}: {
	jobTitle: string
	companyName: string
	feedback: Feedback
}) {
	return (
		<div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
			<div className='card card-shadow flex-center flex-col p-8'>
				<ScoreCircle score={feedback.overallScore} size='lg' />
				<h3 className='line-clamp-2 font-heading font-semibold text-2xl'>
					{jobTitle}
				</h3>
				<p className='line-clamp-2 text-muted-foreground'>{companyName}</p>
			</div>
			<div className='card card-shadow p-8'>
				<ul className='space-y-4'>
					<li>
						<Category
							title='Tone and Style'
							score={feedback.toneAndStyle.score}
						/>
					</li>

					<li>
						<Category title='Content' score={feedback.content.score} />
					</li>
					<li>
						<Category title='Structure' score={feedback.structure.score} />
					</li>
					<li>
						<Category title='Skills' score={feedback.skills.score} />
					</li>
				</ul>
			</div>
		</div>
	)
}
