import { LogIn, LogOut } from 'lucide-react'

import { usePuterStore } from '@/lib/puter'
import { Button } from './Button'

export function AuthButton() {
	const auth = usePuterStore((state) => state.auth)

	if (auth.isAuthenticated)
		return (
			<Button variant='secondary' onClick={auth.signOut}>
				<LogOut />
				<span>Log Out</span>
			</Button>
		)

	return (
		<Button variant='primary' onClick={auth.signIn}>
			<LogIn />
			<span>Log In</span>
		</Button>
	)
}
