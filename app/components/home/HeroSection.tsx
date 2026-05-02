import { Rocket } from 'lucide-react'
import { useShallow } from 'zustand/shallow'

import { usePuterStore } from '@/lib/puter'
import { Button } from '../ui/Button'
import { HeroImage } from './HeroImage'

export function HeroSection() {
	const { auth, isLoading } = usePuterStore(
		useShallow((state) => ({
			auth: state.auth,
			isLoading: state.isLoading,
		}))
	)

	return (
		<section className='relative mx-4 my-6 flex h-fit flex-col-reverse gap-4 md:my-12 md:flex-row lg:mx-12 xl:mx-24 2xl:mx-32'>
			<div className='lg:flex-1'>
				<div className='lg:my-12 xl:my-24'>
					<h2 className='mb-4 text-balance text-center font-extrabold font-heading text-4xl text-ring text-stroke-sm [text-shadow:1px_1px_0px_rgba(70,57,71,1)] sm:mb-6 md:max-w-9/12 md:text-left lg:max-w-11/12 lg:text-5xl xl:max-w-fit xl:text-6xl 2xl:text-7xl'>
						Give Your Resume a Glow-Up ✨
					</h2>
					<p className='mb-6 text-balance text-center sm:text-xl md:max-w-7/12 md:text-left lg:max-w-11/12 xl:max-w-10/12 2xl:text-2xl'>
						Get clear, actionable feedback on your resume tailored to the role
						you actually want—so you can apply with confidence and get better
						results.
					</p>
					<Button
						variant='primary'
						onClick={auth.signIn}
						disabled={isLoading}
						className='mx-auto p-4 md:mx-0'
					>
						<Rocket />
						<span>Get Started</span>
					</Button>
				</div>
			</div>
			<div className='mx-auto size-48 sm:size-60 md:absolute md:top-4 md:-right-4 md:mx-0 md:size-72 lg:static lg:flex-1'>
				<HeroImage />
			</div>
		</section>
	)
}
