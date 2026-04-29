import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/Accordion'
import type { Feedback } from '@/data/types'
import { CategoryContent } from './CategoryContent'
import { CategoryHeader } from './CategoryHeader'

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
