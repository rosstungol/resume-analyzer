import { Loader } from 'lucide-react'
import { Navigate } from 'react-router'
import { useShallow } from 'zustand/shallow'

import { Navbar } from '@/components/layout/Navbar'
import { AuthButton } from '@/components/ui/AuthButton'
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
				{isLoading && (
					<Loader className='m-auto size-16 animate-spin text-accent-foreground' />
				)}

				{!isLoading && auth.isAuthenticated && <UploadForm />}
			</section>
		</>
	)
}
