import { SquareArrowOutUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useShallow } from 'zustand/shallow'
import { ATS } from '@/components/ATS'
import { Details } from '@/components/Details'
import { Summary } from '@/components/Summary'
import type { Feedback } from '@/data/types'
import { usePuterStore } from '@/lib/puter'

export function meta() {
	return [
		{ title: 'Resume Analyzer | Resume' },
		{
			name: 'description',
			content: 'Detailed overview of your resume',
		},
	]
}

export default function Resume() {
	const { auth, fs, isLoading, kv } = usePuterStore(
		useShallow((state) => ({
			auth: state.auth,
			fs: state.fs,
			isLoading: state.isLoading,
			kv: state.kv,
		}))
	)

	const { id } = useParams()
	const [resumeUrl, setResumeUrl] = useState('')
	const [feedback, setFeedback] = useState<Feedback | null>(null)
	const navigate = useNavigate()

	useEffect(() => {
		if (!isLoading && !auth.isAuthenticated)
			navigate(`/auth?next=/resume/${id}`)
	}, [auth.isAuthenticated, navigate, id, isLoading])

	useEffect(() => {
		const loadResume = async () => {
			const resume = await kv.get(`resume:${id}`)

			if (!resume) return

			const data = JSON.parse(resume)

			const resumeBlob = await fs.read(data.resumePath)
			if (!resumeBlob) return

			const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' })
			const resumeUrl = URL.createObjectURL(pdfBlob)
			setResumeUrl(resumeUrl)

			setFeedback(data.feedback)
		}

		loadResume()
	}, [id, fs.read, kv.get])

	return (
		<div className='h-screen'>
			<nav className='p-8'>
				<Link to='/'>⬅ back to home</Link>
			</nav>
			<main>
				<div className='flex items-center justify-between px-16'>
					<h1 className='text-3xl'>Resume Review</h1>
					<a
						href={resumeUrl}
						target='_blank'
						rel='noopener noreferrer'
						className='flex cursor-pointer gap-2 rounded-2xl border p-4'
					>
						<span>view resume</span>
						<SquareArrowOutUpRight />
					</a>
				</div>
				{feedback && (
					<div className='flex flex-col gap-6 px-16 py-12'>
						<Summary feedback={feedback} />
						<ATS
							score={feedback.ATS.score || 0}
							suggestions={feedback.ATS.tips}
						/>
						<Details feedback={feedback} />
					</div>
				)}
			</main>
		</div>
	)
}
