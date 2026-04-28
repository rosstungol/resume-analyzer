import { BadgeAlert, BadgeCheck } from 'lucide-react'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/Accordion'
import type { Feedback } from '@/data/types'
import { cn } from '@/lib/utils'
import { ScoreBadge } from '../ui/ScoreBadge'

const StatusIcon = ({ type }: { type: 'good' | 'improve' }) =>
	type === 'good' ? (
		<BadgeCheck className='text-green-500' />
	) : (
		<BadgeAlert className='text-yellow-500' />
	)

const CategoryHeader = ({
	title,
	categoryScore,
}: {
	title: string
	categoryScore: number
}) => {
	return (
		<div className='flex flex-row items-center gap-4 py-2'>
			<StatusIcon type={categoryScore > 69 ? 'good' : 'improve'} />
			<h2 className='flex items-center gap-2'>
				<span className='font-semibold text-2xl'>
					{title} - {categoryScore}
				</span>
				<span className='text-mauve-400 text-sm'>/ 100</span>
			</h2>

			<ScoreBadge score={categoryScore} />
		</div>
	)
}

const CategoryContent = ({
	tips,
}: {
	tips: { type: 'good' | 'improve'; tip: string; explanation: string }[]
}) => {
	return (
		<div className='flex w-full flex-col items-center gap-4 sm:p-4'>
			<div className='grid w-full grid-cols-1 gap-4 rounded-lg border-2 p-6 md:grid-cols-2'>
				{tips.map((tip) => (
					<div className='flex flex-row items-center gap-2' key={tip.tip}>
						<StatusIcon type={tip.type} />
						<p className='text-xl'>{tip.tip}</p>
					</div>
				))}
			</div>
			<div className='flex w-full flex-col gap-4'>
				{tips.map((tip) => (
					<div
						key={tip.tip}
						className={cn(
							'flex flex-col gap-2 rounded-lg border-2 p-4',
							tip.type === 'good'
								? 'border-green-300 bg-green-50'
								: 'border-yellow-300 bg-yellow-50'
						)}
					>
						<div className='flex flex-row items-center gap-2'>
							<StatusIcon type={tip.type} />
							<p className='font-semibold text-xl'>{tip.tip}</p>
						</div>
						<p>{tip.explanation}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export function Details({ feedback }: { feedback: Feedback }) {
	return (
		<div className='card card-shadow'>
			<Accordion type='single' collapsible defaultValue='toneAndStyle'>
				<AccordionItem value='toneAndStyle'>
					<AccordionTrigger>
						<CategoryHeader
							title='Tone & Style'
							categoryScore={feedback.toneAndStyle.score}
						/>
					</AccordionTrigger>
					<AccordionContent>
						<CategoryContent tips={feedback.toneAndStyle.tips} />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='content'>
					<AccordionTrigger>
						<CategoryHeader
							title='Content'
							categoryScore={feedback.content.score}
						/>
					</AccordionTrigger>
					<AccordionContent>
						<CategoryContent tips={feedback.content.tips} />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='structure'>
					<AccordionTrigger>
						<CategoryHeader
							title='Structure'
							categoryScore={feedback.structure.score}
						/>
					</AccordionTrigger>
					<AccordionContent>
						<CategoryContent tips={feedback.structure.tips} />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value='skills'>
					<AccordionTrigger>
						<CategoryHeader
							title='Skills'
							categoryScore={feedback.skills.score}
						/>
					</AccordionTrigger>
					<AccordionContent>
						<CategoryContent tips={feedback.skills.tips} />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}
