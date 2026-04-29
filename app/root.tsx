import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useNavigate,
} from 'react-router'

import type { Route } from './+types/root'
import './app.css'
import { House } from 'lucide-react'
import { useEffect } from 'react'

import { PageWrapper } from '@/components/layout/PageWrapper'
import { usePuterStore } from '@/lib/puter'
import { Navbar } from './components/layout/Navbar'
import { Button } from './components/ui/Button'

export function Layout({ children }: { children: React.ReactNode }) {
	const { init } = usePuterStore()

	useEffect(() => {
		init()
	}, [init])

	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body>
				<script src='https://js.puter.com/v2/'></script>
				<PageWrapper>{children}</PageWrapper>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	)
}

export default function App() {
	return <Outlet />
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const navigate = useNavigate()

	let message = 'Oops!'
	let details = 'An unexpected error occurred.'
	let stack: string | undefined

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error'
		details =
			error.status === 404
				? 'The requested page could not be found.'
				: error.statusText || details
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message
		stack = error.stack
	}

	return (
		<>
			<Navbar />
			<main className='mx-auto flex-center pt-16 sm:m-4'>
				<div className='card card-shadow mx-auto w-fit p-8 text-center sm:max-w-full'>
					<div className='mb-6'>
						<h2 className='font-bold font-heading text-2xl'>{message}</h2>
						<p>{details}</p>
						{stack && (
							<pre className='w-full overflow-x-auto p-4'>
								<code>{stack}</code>
							</pre>
						)}
					</div>
					<Button onClick={() => navigate('/')} className='mx-auto'>
						<House />
						go home
					</Button>
				</div>
			</main>
		</>
	)
}
