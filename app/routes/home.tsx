import { FileUp, Loader, LogIn, LogOut } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'

import { GridBlankState } from '@/components/home/GridBlankState'
import { ResumeGrid } from '@/components/home/ResumeGrid'
import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { LinkButton } from '@/components/ui/LinkButton'
import type { Resume } from '@/data/types'
import type { KVItem } from '@/data/types/puter'
import { usePuterStore } from '@/lib/puter'

export function meta() {
	return [
		{ title: 'resmyze' },
		{
			name: 'description',
			content:
				'Generate AI-powered resume feedback for landing that dream job!',
		},
	]
}

export default function Home() {
	const { auth, isLoading, kv } = usePuterStore(
		useShallow((state) => ({
			auth: state.auth,
			isLoading: state.isLoading,
			kv: state.kv,
		}))
	)

	const [resumes, setResumes] = useState<Resume[]>([])
	const [loadingResumes, setLoadingResumes] = useState<boolean>(
		auth.isAuthenticated
	)

	useEffect(() => {
		if (!auth.isAuthenticated) {
			setResumes([])
			return
		}

		const loadResumes = async () => {
			setLoadingResumes(true)

			try {
				const resumes = (await kv.list('resume:*', true)) as KVItem[]
				const parsedResumes = (resumes ?? []).flatMap((resume) => {
					try {
						return [JSON.parse(resume.value) as Resume]
					} catch (e) {
						console.error('Skipping malformed resume:', resume.key, e)
						return []
					}
				})

				setResumes(parsedResumes)
			} catch (error) {
				console.error('Failed to load resumes:', error)

				setResumes([])
			} finally {
				setLoadingResumes(false)
			}
		}

		loadResumes()
	}, [kv, auth])

	if (auth.isAuthenticated)
		return (
			<>
				<Navbar>
					{isLoading ? (
						<Loader className='size-8 animate-spin text-indigo-400' />
					) : (
						<Button variant='secondary' onClick={auth.signOut}>
							<LogOut />
							log out
						</Button>
					)}
					<LinkButton variant='primary' href='/upload'>
						<FileUp />
						<span>upload resume</span>
					</LinkButton>
				</Navbar>

				<section className='my-8 lg:m-12'>
					<div>
						{loadingResumes && (
							<Loader className='m-auto size-16 animate-spin text-primary' />
						)}

						{!loadingResumes && resumes.length > 0 && (
							<>
								<h2 className='mb-4 font-heading font-semibold text-2xl'>
									resume reviews
								</h2>
								<ResumeGrid resumes={resumes} />
							</>
						)}

						{!loadingResumes && resumes.length === 0 && <GridBlankState />}
					</div>
				</section>
			</>
		)

	return (
		<>
			<Navbar>
				{isLoading ? (
					<Loader className='size-8 animate-spin text-primary' />
				) : (
					<Button onClick={auth.signIn}>
						<LogIn />
						log in
					</Button>
				)}
			</Navbar>

			<section className='py-12'>
				{!isLoading && <div>hero section</div>}
			</section>
		</>
	)
}
