import { useRef } from 'react'
import { useIsVisible } from '@/hooks/useIsIntersecting'
import { cn } from '@/lib/utils'

type InstructionStepProps = {
	number: number
	title: string
	body: string
}

function InstructionStep({ number, title, body }: InstructionStepProps) {
	const textRef = useRef(null)
	const isVisible = useIsVisible(textRef)

	return (
		<li
			className={cn(
				'card card-shadow col-span-2 md:last:col-span-2 md:last:col-start-2 lg:last:col-start-auto',
				'transition duration-200 ease-in',
				isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
			)}
		>
			<div className='space-y-4 px-10 pt-6 pb-10 lg:px-6 xl:px-10'>
				<h3>
					<span className='heading-shadow mr-3 font-bold font-heading text-5xl text-accent-foreground text-stroke-sm'>
						{number}
					</span>
					<span className='font-bold font-heading text-xl'>{title}</span>
				</h3>
				<p ref={textRef} className='text-balance'>
					{body}
				</p>
			</div>
		</li>
	)
}

export function InstructionsSection() {
	return (
		<section className='mt-20 mb-12 lg:mx-8'>
			<h2 className='heading-shadow-sm mb-4 text-center font-bold font-heading text-3xl text-ring text-stroke-sm'>
				How it works
			</h2>
			<div>
				<ul className='grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6'>
					<InstructionStep
						number={1}
						title='Tell Us About the Role'
						body='Enter the company name, job title, and the job summary. This helps tailor the analysis to what employers are really looking for.'
					/>
					<InstructionStep
						number={2}
						title='Upload Your Resume'
						body='Drop in your resume in PDF format. Quick and easy.'
					/>
					<InstructionStep
						number={3}
						title='Get Instant Insights'
						body='We’ll analyze your resume, then give you an overall score and a
                detailed look at what’s working and what’s not.'
					/>
				</ul>
			</div>
		</section>
	)
}
