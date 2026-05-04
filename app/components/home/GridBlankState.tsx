import { FileUp } from 'lucide-react'

import { LinkButton } from '../ui/LinkButton'
import { BlankImage } from './BlankImage'

export function GridBlankState({ message }: { message: string }) {
	return (
		<div className='mx-auto flex-center sm:m-4 sm:mt-16'>
			<div className='card card-shadow mx-auto w-fit p-8 text-center sm:max-w-full'>
				<div className='m-auto size-60'>
					<BlankImage />
				</div>
				<div className='mb-6'>
					<h2 className='mb-2 font-bold font-heading text-2xl'>
						There's nothing here
					</h2>
					<p>{message}</p>
				</div>
				<LinkButton variant='primary' href='/upload'>
					<FileUp />
					<span>Upload Resume</span>
				</LinkButton>
			</div>
		</div>
	)
}
