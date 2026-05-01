import { ArrowLeft, Loader } from 'lucide-react'
import { Navigate } from 'react-router'
import { useShallow } from 'zustand/shallow'

import { Navbar } from '@/components/layout/Navbar'
import { AuthButton } from '@/components/ui/AuthButton'
import { TextLink } from '@/components/ui/TextLink'
import { UploadForm } from '@/components/upload/UploadForm'
import { usePuterStore } from '@/lib/puter'

export function meta() {
	return [
		{ title: 'resmyze | upload' },
		{
			name: 'description',
			content: 'Upload your resume.',
		},
	]
}

export default function UploadPage() {
	const { auth, isLoading } = usePuterStore(
		useShallow((state) => ({
			auth: state.auth,
			isLoading: state.isLoading,
		}))
	)

	if (!isLoading && !auth.isAuthenticated) {
		return <Navigate to='/' replace />
	}

	return (
		<>
			<Navbar>
				{!isLoading && auth.isAuthenticated ? (
					<AuthButton />
				) : (
					<Loader className='size-8 animate-spin text-accent-foreground' />
				)}
			</Navbar>

			<section className='my-8 lg:m-12'>
				<div className='mb-4 flex flex-col-reverse items-center justify-between gap-4 md:flex-row'>
					<div>
						<h2 className='font-bold font-heading text-2xl'>
							Upload your resume
						</h2>
					</div>
					<p className='font-semibold text-muted-foreground'>
						<TextLink href='/'>
							<ArrowLeft />
							<span className='font-semibold'>Back to home</span>
						</TextLink>
					</p>
				</div>
				<UploadForm />
			</section>
		</>
	)
}
