import { FileUp } from 'lucide-react'

import { LinkButton } from '../ui/LinkButton'

export function GridBlankState() {
	return (
		<div className='flex-center p-8'>
			<div className='flex flex-col items-center gap-4'>
				<h2 className='font-heading text-2xl text-mauve-800'>
					There's nothing here.
				</h2>
				<p className='text-mauve-600'>Upload your resume to get feedback.</p>
				<LinkButton variant='primary' href='/upload'>
					<FileUp />
					<span>upload resume</span>
				</LinkButton>
			</div>
		</div>
	)
}
