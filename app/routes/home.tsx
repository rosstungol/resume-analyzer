import { Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useShallow } from 'zustand/shallow'
import { ScoreCircle } from '@/components/ScoreCircle'
import type { Resume } from '@/data/types'
import type { KVItem } from '@/data/types/puter'
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
	const { auth, kv } = usePuterStore(
		useShallow((state) => ({
			auth: state.auth,
			kv: state.kv,
		}))
	)

	const [resumes, setResumes] = useState<Resume[]>([])
	const [loadingResumes, setLoadingResumes] = useState<boolean>(false)

	const navigate = useNavigate()

	useEffect(() => {
		if (!auth.isAuthenticated) navigate('/auth?next=/')
	}, [auth.isAuthenticated, navigate])

	useEffect(() => {
		const loadResumes = async () => {
			setLoadingResumes(true)

			const resumes = (await kv.list('resume:*', true)) as KVItem[]

			const parsedResumes = resumes?.map(
				(resume) => JSON.parse(resume.value) as Resume
			)

			setResumes(parsedResumes || [])

			setLoadingResumes(false)
		}

		loadResumes()
	}, [kv])

	if (!auth.isAuthenticated) {
		return (
			<div className='flex size-16 h-screen w-full items-center justify-center'>
				<Loader className='animate-spin' />
			</div>
		)
	}
	return (
		<div className='h-screen'>
			<nav className='p-16'>
				<Link to='/upload' className='rounded-2xl border p-4'>
					Upload Resume
				</Link>
			</nav>
			<main className='p-20'>
				<div>
					{!loadingResumes && resumes.length === 0 && (
						<h2 className='text-center'>No resumes found.</h2>
					)}
					{loadingResumes && <Loader className='m-auto size-16 animate-spin' />}
					<ul className='grid grid-cols-3 gap-6'>
						{!loadingResumes &&
							resumes.length > 0 &&
							resumes.map((item) => (
								<li key={item.id} className='rounded-lg border border-gray-600'>
									<Link
										to={`/resume/${item.id}`}
										className='flex cursor-pointer items-center gap-2 p-4'
									>
										<ScoreCircle score={item.feedback.overallScore} />
										<div className='truncate'>
											<p className='line-clamp-2 text-xl'>{item.jobTitle}</p>
											<p className='text-gray-500 text-sm'>
												{item.companyName}
											</p>
										</div>
									</Link>
								</li>
							))}
					</ul>
				</div>
			</main>
		</div>
	)
}
