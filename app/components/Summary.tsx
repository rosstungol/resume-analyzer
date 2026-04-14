import type { Feedback } from '@/data/types'
import { ScoreBadge } from './ScoreBadge'
import { ScoreCircle } from './ScoreCircle'

function Category({ title, score }: { title: string; score: number }) {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center gap-2'>
				<p className='mr-5'>{title}</p>
				<ScoreBadge score={score} />
			</div>

			<p className='flex items-center gap-2'>
				<span className='font-semibold text-xl'>{score}</span>
				<span className='text-gray-400 text-xs'>/ 100</span>
			</p>
		</div>
	)
}

export function Summary({ feedback }: { feedback: Feedback }) {
	return (
		<div className='flex flex-col gap-6 rounded-lg border border-gray-600 p-6 shadow-md'>
			<div className='flex items-center justify-between'>
				<h2 className='text-2xl'>Overall Score</h2>
				<ScoreCircle score={feedback.overallScore} />
			</div>
			<Category title='Tone and Style' score={feedback.toneAndStyle.score} />
			<Category title='Content' score={feedback.content.score} />
			<Category title='Structure' score={feedback.structure.score} />
			<Category title='Skills' score={feedback.skills.score} />
		</div>
	)
}
