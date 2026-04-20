import { FileSearchCorner, ListRestart } from 'lucide-react'
import { type SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { useShallow } from 'zustand/shallow'

import { prepareInstructions } from '@/data/constants'
import { usePuterStore } from '@/lib/puter'
import { Button } from '../ui/Button'
import { FileUploader } from './FileUploader'

export function UploadForm() {
	const { ai, fs, kv } = usePuterStore(
		useShallow((state) => ({
			ai: state.ai,
			fs: state.fs,
			kv: state.kv,
		}))
	)

	const [isProcessing, setIsProcessing] = useState(false)
	const [statusText, setStatusText] = useState('')
	const [file, setFile] = useState<File | null>(null)
	const navigate = useNavigate()

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

	if (isProcessing)
		return (
			<div className='card card-shadow mx-auto w-fit min-w-80 space-y-4 p-8 text-center'>
				<h2 className='font-heading font-semibold text-2xl'>{statusText}</h2>
				<FileSearchCorner className='m-auto size-16 animate-pulse text-primary' />
			</div>
		)

	return (
		<>
			<h2 className='mb-4 font-heading font-semibold text-2xl'>
				upload your resume
			</h2>

			<div className='card card-shadow p-6 lg:p-8'>
				<form
					id='upload-form'
					onSubmit={handleSubmit}
					className='flex flex-col gap-8 md:flex-row lg:gap-12'
				>
					<div className='flex-1 space-y-8'>
						<div className='flex flex-col gap-2'>
							<label
								htmlFor='company-name'
								className='font-heading font-semibold'
							>
								Company Name
							</label>
							<input
								type='text'
								id='company-name'
								name='company-name'
								placeholder='Company Name'
								className='form-input'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='job-title' className='font-heading font-semibold'>
								Job Title
							</label>
							<input
								type='text'
								id='job-title'
								name='job-title'
								placeholder='Job Title'
								className='form-input'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label
								htmlFor='job-description'
								className='font-heading font-semibold'
							>
								Job Description
							</label>
							<textarea
								rows={4}
								id='job-description'
								name='job-description'
								placeholder='Job Description'
								className='form-input flex-1 resize-none'
							/>
						</div>
					</div>
					<div className='flex flex-1 flex-col justify-between gap-4'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='uploader' className='font-heading font-semibold'>
								Upload Resume
							</label>
							<FileUploader onFileSelect={handleFileSelect} />
						</div>
						<div className='flex flex-row gap-3'>
							<Button type='reset' variant='secondary'>
								<ListRestart />
								<span className='hidden sm:inline'>reset</span>
							</Button>
							<Button type='submit' variant='primary' className='flex-1'>
								<FileSearchCorner />
								<span>analyze resume</span>
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}
