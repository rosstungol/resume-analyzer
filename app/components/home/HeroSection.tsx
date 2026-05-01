import { HeroImage } from './HeroImage'

export function HeroSection() {
	return (
		<section className='flex lg:mx-20'>
			<div className='size-1/2'>
				<h2>hero section</h2>
			</div>
			<div className='size-1/2'>
				<HeroImage />
			</div>
		</section>
	)
}
