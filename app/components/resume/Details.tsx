import { BadgeAlert, BadgeCheck } from 'lucide-react'

import type { Feedback } from '@/data/types'
import { cn } from '@/lib/utils'
import { ScoreBadge } from '../ui/ScoreBadge'
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from './Accordion'

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string
  categoryScore: number
}) => {
  return (
    <div className='flex flex-row items-center gap-4 py-2'>
      {categoryScore > 69 ? <BadgeCheck /> : <BadgeAlert />}
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
    <div className='flex w-full flex-col items-center gap-4'>
      <div className='grid w-full grid-cols-2 gap-4 rounded-lg bg-mauve-50 px-5 py-4'>
        {tips.map((tip) => (
          <div className='flex flex-row items-center gap-2' key={tip.tip}>
            {tip.type === 'good' ? <BadgeCheck /> : <BadgeAlert />}
            <p className='text-mauve-500 text-xl'>{tip.tip}</p>
          </div>
        ))}
      </div>
      <div className='flex w-full flex-col gap-4'>
        {tips.map((tip) => (
          <div
            key={tip.tip}
            className={cn(
              'flex flex-col gap-2 rounded-2xl p-4',
              tip.type === 'good'
                ? 'border border-green-200 bg-green-50 text-green-700'
                : 'border border-yellow-200 bg-yellow-50 text-yellow-700',
            )}
          >
            <div className='flex flex-row items-center gap-2'>
              {tip.type === 'good' ? <BadgeCheck /> : <BadgeAlert />}
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
    <div className='flex w-full flex-col gap-4'>
      <Accordion>
        <AccordionItem id='tone-style'>
          <AccordionHeader itemId='tone-style'>
            <CategoryHeader
              title='Tone & Style'
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId='tone-style'>
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id='content'>
          <AccordionHeader itemId='content'>
            <CategoryHeader
              title='Content'
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId='content'>
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id='structure'>
          <AccordionHeader itemId='structure'>
            <CategoryHeader
              title='Structure'
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId='structure'>
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem id='skills' withBorder={false}>
          <AccordionHeader itemId='skills'>
            <CategoryHeader
              title='Skills'
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId='skills'>
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
