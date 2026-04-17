import { Loader, SquareArrowOutUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import { useShallow } from 'zustand/shallow'

import { Navbar } from '@/components/layout/Navbar'
import { ATS } from '@/components/resume/ATS'
import { Details } from '@/components/resume/Details'
import { Summary } from '@/components/resume/Summary'
import { LinkButton } from '@/components/ui/LinkButton'
import type { Feedback } from '@/data/types'
import { usePuterStore } from '@/lib/puter'

export function meta() {
	return [
		{ title: 'resmyze | resume' },
		{
			name: 'description',
			content: 'Detailed overview of your resume',
		},
	]
}

export default function Resume() {
	const { auth, fs, kv } = usePuterStore(
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

	useEffect(() => {
		let objectUrl: string | null = null

		const loadResume = async () => {
			try {
				const resume = await kv.get(`resume:${id}`)

				if (!resume) return

				const data = JSON.parse(resume)
				const resumeBlob = await fs.read(data.resumePath)

				if (!resumeBlob) return

				const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' })
				objectUrl = URL.createObjectURL(pdfBlob)
				setResumeUrl(objectUrl)

				setFeedback(data.feedback)
			} catch (error) {
				console.error('Failed to load resume:', error)
			}
		}

		loadResume()

		return () => {
			if (objectUrl) {
				URL.revokeObjectURL(objectUrl)
			}
		}
	}, [id, fs, kv])

	if (!auth.isAuthenticated) {
		return <Navigate to='/' replace />
	}

	return (
		<div className='h-screen'>
			<Navbar>
				{resumeUrl ? (
					<LinkButton href={resumeUrl} variant='secondary' fileRoute>
						<SquareArrowOutUpRight />
						<span>view resume</span>
					</LinkButton>
				) : (
					<Loader className='size-8 animate-spin text-indigo-400' />
				)}
			</Navbar>
			<main>
				<div className='flex items-center justify-between px-16'>
					<h2 className='font-heading text-3xl'>Resume Review</h2>
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
