import { FileSearchCorner } from 'lucide-react'
import { type SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { useShallow } from 'zustand/shallow'

import { Navbar } from '@/components/layout/Navbar'
import { Button } from '@/components/ui/Button'
import { FileUploader } from '@/components/upload/FileUploader'
import { prepareInstructions } from '@/data/constants'
import { usePuterStore } from '@/lib/puter'

export function meta() {
	return [
		{ title: 'resyze | upload' },
		{
			name: 'description',
			content: 'Upload your resume.',
		},
	]
}

export default function Upload() {
	const { ai, fs, kv } = usePuterStore(
		useShallow((state) => ({
			ai: state.ai,
			fs: state.fs,
			kv: state.kv,
		}))
	)
	const navigate = useNavigate()
	const [isProcessing, setIsProcessing] = useState(false)
	const [statusText, setStatusText] = useState('')
	const [file, setFile] = useState<File | null>(null)

	const handleFileSelect = (file: File | null) => {
		setFile(file)
	}

	const handleAnalyze = async ({
		companyName,
		jobTitle,
		jobDescription,
		file,
	}: {
		companyName: string
		jobTitle: string
		jobDescription: string
		file: File
	}) => {
		setIsProcessing(true)

		setStatusText('Uploading file...')
		const uploadedFile = await fs.upload([file])

		if (!uploadedFile) {
			setStatusText('Error: Failed to upload file')
			setIsProcessing(false)
			return
		}

		setStatusText('Preparing data...')

		const uuid = crypto.randomUUID()
		const data = {
			id: uuid,
			resumePath: uploadedFile.path,
			companyName,
			jobTitle,
			jobDescription,
			feedback: '',
		}

		await kv.set(`resume:${uuid}`, JSON.stringify(data))

		setStatusText('Analyzing...')

		const feedback = await ai.feedback(
			uploadedFile.path,
			prepareInstructions({ jobTitle, jobDescription })
		)

		if (!feedback) {
			setStatusText('Error: Failed to analyze resume')
			setIsProcessing(false)
			return
		}

		const feedbackText =
			typeof feedback.message.content === 'string'
				? feedback.message.content
				: feedback.message.content?.[0]?.text

		if (!feedbackText) {
			setStatusText('Error: Empty response from AI')
			setIsProcessing(false)
			return
		}

		try {
			data.feedback = JSON.parse(feedbackText)
		} catch {
			setStatusText('Error: Failed to parse AI response')
			setIsProcessing(false)
			return
		}

		await kv.set(`resume:${uuid}`, JSON.stringify(data))
		setStatusText('Analysis complete. Redirecting...')

		navigate(`/resume/${uuid}`)
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault()

		const form = e.currentTarget.closest('form')

		if (!form) return

		const formData = new FormData(form)

		const companyName = formData.get('company-name') as string
		const jobTitle = formData.get('job-title') as string
		const jobDescription = formData.get('job-description') as string

		if (!file) return

		handleAnalyze({ companyName, jobTitle, jobDescription, file })
	}

	return (
		<div className='h-screen'>
			<Navbar />

			<main className='flex-center'>
				<section>
					<h1>{statusText}</h1>
					{isProcessing ? (
						<p>Processing...</p>
					) : (
						<p className='mb-8'>Upload your resume.</p>
					)}
					{!isProcessing && (
						<form
							id='upload-form'
							onSubmit={handleSubmit}
							className='flex w-96 flex-col gap-6'
						>
							<div className='flex flex-col gap-2'>
								<label htmlFor='company-name'>Company Name</label>
								<input
									type='text'
									id='company-name'
									name='company-name'
									placeholder='Company Name'
									className='rounded-lg border border-mauve-600 p-3'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<label htmlFor='job-title'>Job Title</label>
								<input
									type='text'
									id='job-title'
									name='job-title'
									placeholder='Job Title'
									className='rounded-lg border border-mauve-600 p-3'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<label htmlFor='job-description'>Job Description</label>
								<textarea
									rows={4}
									id='job-description'
									name='job-description'
									placeholder='Job Description'
									className='rounded-lg border border-mauve-600 p-3'
								/>
							</div>
							<div className='flex flex-col gap-2'>
								<label htmlFor='uploader'>Upload Resume</label>
								<FileUploader onFileSelect={handleFileSelect} />
							</div>
							<Button type='submit' variant='primary'>
								<FileSearchCorner />
								analyze resume
							</Button>
						</form>
					)}
				</section>
			</main>
		</div>
	)
}
