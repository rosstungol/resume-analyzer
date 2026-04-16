import type { Resume } from '@/data/types'
import { GridItem } from './GridItem'

export function ResumeGrid({ resumes }: { resumes: Resume[] }) {
  return (
    <ul className='has-hover:*:not-hover:translate-0.5 grid grid-cols-3 gap-6 has-hover:*:not-hover:opacity-50 has-hover:*:not-hover:shadow-none'>
      {resumes.map((item) => (
        <GridItem
          key={item.id}
          href={`/resume/${item.id}`}
          title={item.jobTitle}
          subtitle={item.companyName}
          score={item.feedback.overallScore}
        />
      ))}
    </ul>
  )
}
