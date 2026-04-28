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
	const { auth, fs, isLoading, kv } = usePuterStore(
		useShallow((state) => ({
			auth: state.auth,
			fs: state.fs,
			isLoading: state.isLoading,
			kv: state.kv,
		}))
	)

	const [resumeData, setResumeData] = useState({
		fileUrl: '',
		companyName: '',
		jobTitle: '',
	})
	const [feedback, setFeedback] = useState<Feedback | null>(null)
	const { id } = useParams()

	useEffect(() => {
		const loadResume = async () => {
			try {
				const resume = await kv.get(`resume:${id}`)

				if (!resume) return

				const data = JSON.parse(resume)

				const resumeBlob = await fs.read(data.resumePath)

				if (!resumeBlob) return

				const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' })

				setResumeData((prev) => ({
					...prev,
					jobTitle: data.jobTitle,
					companyName: data.companyName,
					fileUrl: URL.createObjectURL(pdfBlob),
				}))

				setFeedback(data.feedback)
			} catch (error) {
				console.error('Failed to load resume:', error)
			}
		}

		loadResume()
	}, [id, fs, kv])

	if (!isLoading && !auth.isAuthenticated) {
		return <Navigate to='/' replace />
	}

	return (
		<>
			<Navbar>
				{resumeData.fileUrl ? (
					<LinkButton href={resumeData.fileUrl} variant='secondary' fileRoute>
						<SquareArrowOutUpRight />
						<span>view resume</span>
					</LinkButton>
				) : (
					<Loader className='size-8 animate-spin text-primary' />
				)}
			</Navbar>

			<section className='my-8 lg:m-12'>
				<div className='flex items-center justify-between'>
					<h2 className='mb-4 font-heading font-semibold text-2xl'>
						resume review
					</h2>
				</div>
				{feedback && (
					<div className='flex flex-col gap-8'>
						<Summary
							companyName={resumeData.companyName}
							jobTitle={resumeData.jobTitle}
							feedback={feedback}
						/>
						<ATS
							score={feedback.ATS.score || 0}
							suggestions={feedback.ATS.tips}
						/>
						<Details feedback={feedback} />
					</div>
				)}
			</section>
		</>
	)
}
