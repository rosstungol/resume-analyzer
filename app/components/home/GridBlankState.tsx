import { FileUp } from 'lucide-react'

import { LinkButton } from '../ui/LinkButton'

export function GridBlankState() {
	return (
		<div className='flex-center p-8'>
			<div className='card card-shadow mx-auto min-w-80 p-8 text-center'>
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
