import { ArrowUpRight, FileUp, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'

import { GridBlankState } from '@/components/home/GridBlankState'
import { HeroSection } from '@/components/home/HeroSection'
import { ResumeGrid } from '@/components/home/ResumeGrid'
import { Navbar } from '@/components/layout/Navbar'
import { AuthButton } from '@/components/ui/AuthButton'
import { LinkButton } from '@/components/ui/LinkButton'
import { TextLink } from '@/components/ui/TextLink'
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

export default function HomePage() {
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
	}, [kv, auth.isAuthenticated])

	if (auth.isAuthenticated)
		return (
			<>
				<Navbar>
					{!isLoading ? (
						<>
							<AuthButton />
							<LinkButton variant='primary' href='/upload'>
								<FileUp />
								<span>Upload Resume</span>
							</LinkButton>
						</>
					) : (
						<Loader className='size-8 animate-spin text-accent-foreground' />
					)}
				</Navbar>

				<section className='my-8 lg:m-12'>
					{loadingResumes && (
						<Loader className='m-auto size-16 animate-spin text-accent-foreground' />
					)}

					{!loadingResumes && resumes.length > 0 && (
						<>
							<div className='mb-4 flex flex-col-reverse items-center justify-between gap-4 md:flex-row'>
								<h2 className='font-bold font-heading text-2xl'>
									Resume Reviews
								</h2>
								<TextLink href='/wipe'>
									<span className='font-semibold'>Manage Files</span>
									<ArrowUpRight />
								</TextLink>
							</div>
							<ResumeGrid resumes={resumes} />
						</>
					)}

					{!loadingResumes && resumes.length === 0 && (
						<GridBlankState message='Upload your resume to get feedback.' />
					)}
				</section>
			</>
		)

	return (
		<>
			<Navbar>
				{!isLoading ? (
					<div className='hidden md:inline-block'>
						<AuthButton />
					</div>
				) : (
					<Loader className='size-8 animate-spin text-accent-foreground' />
				)}
			</Navbar>

			{!isLoading && <HeroSection />}
		</>
	)
}
