import { SquareArrowOutUpRight } from 'lucide-react'
import { useRef } from 'react'

import { useIsVisible } from '@/hooks/useIsVisible'
import { cn } from '@/lib/utils'

export function FeaturesSection() {
	const textRef = useRef<HTMLParagraphElement>(null)
	const isVisible = useIsVisible(textRef)

	return (
		<>
			<section
				className={cn(
					'card card-shadow mb-6 flex flex-col border-2 bg-card-highlight lg:mx-8 lg:flex-row lg:items-center',
					'transition duration-200 ease-in',
					isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
				)}
			>
				<div className='space-y-6 p-6 md:px-12 md:pt-12 md:pb-0 lg:p-12'>
					<h3 className='heading-shadow mr-3 font-bold font-heading text-4xl text-accent-foreground text-stroke-sm sm:text-5xl'>
						Your Resume, But Sharper
					</h3>
					<p ref={textRef} className='text-pretty text-xl sm:text-2xl'>
						We break things down into the stuff that actually matters:
					</p>
					<ul className='text-pretty text-sm sm:text-lg'>
						<li>
							<strong>ATS Check</strong> – Can it pass the bots?
						</li>
						<li>
							<strong>Tone and Style</strong> – Clear, clean, and easy to
							follow?
						</li>
						<li>
							<strong>Content</strong> – Strong impact or just filling space?
						</li>
						<li>
							<strong>Structure</strong> – Smooth flow or hard to scan?
						</li>
						<li>
							<strong>Skills Match</strong> – Do you fit the role on paper?
						</li>
					</ul>
				</div>
				<div className='m-3 h-fit w-fit rounded-lg border-2 bg-card p-6 sm:m-6 md:m-12 md:p-12 lg:w-1/2 lg:p-6 xl:my-auto xl:p-12'>
					<h3 className='heading-shadow-sm mb-4 font-bold font-heading text-5xl text-ring text-stroke-sm'>
						Polish it. Send it. Repeat.
					</h3>
					<p className='text-pretty text-lg xl:text-xl'>
						A few small tweaks can go a long way. These are practical
						suggestions you can apply right away, so your resume feels less like
						a guess and more like a strategy. Let’s make your next application
						your strongest one yet.
					</p>
				</div>
			</section>

			<p className='text-center text-muted-foreground text-sm'>
				<a
					href='https://storyset.com/online'
					target='_blank'
					rel='noopener noreferrer'
					className='flex-center gap-1'
				>
					<SquareArrowOutUpRight className='size-4' />
					<span>Illustrations by Storyset</span>
				</a>
			</p>
		</>
	)
}
