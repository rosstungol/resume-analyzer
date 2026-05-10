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
		<section className='relative mx-4 my-6 flex h-fit flex-col-reverse gap-4 md:mx-12 md:my-12 md:flex-row lg:my-2 xl:mx-20 2xl:mx-32'>
			<div className='lg:flex-1'>
				<div className='lg:my-12 xl:my-20'>
					<h2 className='heading-shadow-sm mb-4 text-balance text-center font-extrabold font-heading text-5xl text-ring text-stroke-sm sm:mb-6 md:max-w-9/12 md:text-left lg:max-w-11/12 lg:text-7xl xl:max-w-fit xl:text-8xl'>
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
			<div className='mx-auto size-48 sm:size-60 md:absolute md:top-4 md:-right-4 md:mx-0 md:size-72 lg:static lg:my-8 lg:flex-1 xl:my-14 2xl:my-8'>
				<HeroImage />
			</div>
		</section>
	)
}
