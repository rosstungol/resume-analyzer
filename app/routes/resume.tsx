import { Loader, LogOut, SquareArrowOutUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router'
import { useShallow } from 'zustand/shallow'

import { Navbar } from '@/components/layout/Navbar'
import { ATS } from '@/components/resume/ATS'
import { Details } from '@/components/resume/Details'
import { Summary } from '@/components/resume/Summary'
import { Button } from '@/components/ui/Button'
import { LinkButton } from '@/components/ui/LinkButton'
import type { ResumeFeedbackData } from '@/data/types'
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

const INITIAL_RESUME_DATA = {
	fileUrl: null,
	companyName: '',
	jobTitle: '',
	feedback: null,
}

export default function ResumePage() {
	const { auth, fs, isLoading, kv } = usePuterStore(
		useShallow((state) => ({
			auth: state.auth,
			fs: state.fs,
			isLoading: state.isLoading,
			kv: state.kv,
		}))
	)

	const { id } = useParams()
	const [resumeFeedbackData, setResumeFeedbackData] =
		useState<ResumeFeedbackData>(INITIAL_RESUME_DATA)

	useEffect(() => {
		setResumeFeedbackData(INITIAL_RESUME_DATA)

		if (isLoading || !auth.isAuthenticated || !id) return

		let active = true
		let objectUrl: string | null = null

		const loadResume = async () => {
			try {
				const resume = await kv.get(`resume:${id}`)

				if (!resume || !active) return

				const data = JSON.parse(resume)
				const resumeBlob = await fs.read(data.resumePath)

				if (!resumeBlob || !active) return

				const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' })
				objectUrl = URL.createObjectURL(pdfBlob)

				if (!active) {
					URL.revokeObjectURL(objectUrl)
					return
				}

				setResumeFeedbackData((prev) => ({
					...prev,
					jobTitle: data.jobTitle,
					companyName: data.companyName,
					fileUrl: objectUrl,
					feedback: data.feedback,
				}))
			} catch (error) {
				console.error('Failed to load resume:', error)
			}
		}

		loadResume()

		return () => {
			active = false
			if (objectUrl) URL.revokeObjectURL(objectUrl)
		}
	}, [id, fs, kv, isLoading, auth.isAuthenticated])

	if (!isLoading && !auth.isAuthenticated) {
		return <Navigate to='/' replace />
	}

	return (
		<>
			<Navbar>
				{!isLoading ? (
					<>
						<Button variant='secondary' onClick={auth.signOut}>
							<LogOut />
							log out
						</Button>
						{resumeFeedbackData.fileUrl && (
							<LinkButton
								href={resumeFeedbackData.fileUrl}
								variant='primary'
								fileRoute
							>
								<SquareArrowOutUpRight />
								<span>view resume</span>
							</LinkButton>
						)}
					</>
				) : (
					<Loader className='size-8 animate-spin text-accent-foreground' />
				)}
			</Navbar>

			<section className='my-8 lg:m-12'>
				<div className='flex items-center justify-between'>
					<h2 className='mb-4 font-bold font-heading text-2xl'>
						resume review
					</h2>
				</div>
				{resumeFeedbackData.feedback && (
					<div className='flex flex-col gap-8'>
						<Summary
							companyName={resumeFeedbackData.companyName}
							jobTitle={resumeFeedbackData.jobTitle}
							feedback={resumeFeedbackData.feedback}
						/>
						<ATS
							score={resumeFeedbackData.feedback.ATS.score || 0}
							tips={resumeFeedbackData.feedback.ATS.tips}
						/>
						<Details feedback={resumeFeedbackData.feedback} />
					</div>
				)}
			</section>
		</>
	)
}
