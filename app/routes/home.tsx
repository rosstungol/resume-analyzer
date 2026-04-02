import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'

import { usePuterStore } from '@/lib/puter'

export function meta() {
	return [
		{ title: 'Resume Analyzer' },
		{
			name: 'description',
			content:
				'Generate AI-powered resume feedback for landing that dream job!',
		},
	]
}

export default function Home() {
	const { auth } = usePuterStore()

	const navigate = useNavigate()

	useEffect(() => {
		if (!auth.isAuthenticated) navigate('/auth?next=/')
	}, [auth.isAuthenticated, navigate])

	if (!auth.isAuthenticated) {
		return null
	}

	return (
		<main className='flex h-screen items-center justify-center'>
			<Link to='/upload' className='rounded-2xl border p-4'>
				Upload Resume
			</Link>
		</main>
	)
}
