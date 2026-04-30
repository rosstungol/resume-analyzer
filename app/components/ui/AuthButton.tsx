import { LogIn, LogOut } from 'lucide-react'
import { useShallow } from 'zustand/shallow'

import { usePuterStore } from '@/lib/puter'
import { Button } from './Button'

export function AuthButton() {
	const { auth, isLoading } = usePuterStore(
		useShallow((state) => ({
			auth: state.auth,
			isLoading: state.isLoading,
		}))
	)

	if (auth.isAuthenticated)
		return (
			<Button variant='secondary' onClick={auth.signOut} disabled={isLoading}>
				<LogOut />
				<span>Log Out</span>
			</Button>
		)

	return (
		<Button variant='primary' onClick={auth.signIn} disabled={isLoading}>
			<LogIn />
			<span>Log In</span>
		</Button>
	)
}
