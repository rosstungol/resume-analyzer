import { FileUp } from 'lucide-react'

import { LinkButton } from '../ui/LinkButton'

export function GridBlankState() {
	return (
		<div className='mx-auto flex-center pt-16 sm:m-4'>
			<div className='card card-shadow mx-auto w-fit p-8 text-center sm:max-w-full'>
				<div className='mb-6'>
					<h2 className='font-heading font-semibold text-2xl'>
						There's nothing here.
					</h2>
					<p className='text-muted-foreground'>
						Upload your resume to get feedback.
					</p>
				</div>
				<LinkButton variant='primary' href='/upload'>
					<FileUp />
					<span>upload resume</span>
				</LinkButton>
			</div>
		</div>
	)
}
