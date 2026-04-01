import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

import { useShallow } from 'zustand/shallow'
import { Button } from '~/components/Button'
import { usePuterStore } from '~/lib/puter'

export function meta() {
	return [
		{ title: 'Resume Analyzer | Auth' },
		{
			name: 'description',
			content: 'Log into your account',
		},
	]
}

export default function Auth() {
	const { isLoading, auth } = usePuterStore(
		useShallow((state) => ({
			isLoading: state.isLoading,
			auth: state.auth,
		}))
	)

	const location = useLocation()
	const next = location.search.split('next=')[1]

	const navigate = useNavigate()

	useEffect(() => {
		if (auth.isAuthenticated) navigate(next)
	}, [auth.isAuthenticated, next, navigate])

	return (
		<main className='flex h-screen items-center justify-center'>
			<section>
				{isLoading ? (
					<Button className='animate-pulse'>loading</Button>
				) : auth.isAuthenticated ? (
					<Button onClick={auth.signOut}>log out</Button>
				) : (
					<Button onClick={auth.signIn}>log in</Button>
				)}
			</section>
		</main>
	)
}
