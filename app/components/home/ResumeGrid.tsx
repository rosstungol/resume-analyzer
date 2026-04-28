import type { Resume } from '@/data/types'
import { GridItem } from './GridItem'

export function ResumeGrid({ resumes }: { resumes: Resume[] }) {
	return (
		<ul className='grid grid-cols-1 gap-6 has-hover:*:not-hover:translate-y-0.5 has-hover:*:not-hover:opacity-50 has-hover:*:not-hover:shadow-none lg:grid-cols-2'>
			{resumes.map((item) => (
				<li key={item.id}>
					<GridItem
						href={`/resume/${item.id}`}
						title={item.jobTitle}
						subtitle={item.companyName}
						score={item.feedback.overallScore}
					/>
				</li>
			))}
		</ul>
	)
}
