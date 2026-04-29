import { Loader, LogOut } from 'lucide-react'
import { Navigate } from 'react-router'
import { useShallow } from 'zustand/shallow'

import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
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
					<Button variant='secondary' onClick={auth.signOut}>
						<LogOut />
						log out
					</Button>
				) : (
					<Loader className='size-8 animate-spin text-accent-foreground' />
				)}
			</Navbar>

			<section className='my-8 lg:m-12'>
				<UploadForm />
			</section>
		</>
	)
}
