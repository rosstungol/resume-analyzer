import { ArrowLeft, FileSearchCorner, FileUp, ListRestart } from 'lucide-react'
import { type SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { useShallow } from 'zustand/shallow'

import { prepareInstructions } from '@/data/constants'
import { uploadFormSchema } from '@/data/schemas'
import type { UploadFormData } from '@/data/types'
import type { AIResponse } from '@/data/types/puter'
import { usePuterStore } from '@/lib/puter'
import { cn } from '@/lib/utils'
import { Button } from '../ui/Button'
import { TextLink } from '../ui/TextLink'
import { FileUploader } from './FileUploader'

const INITIAL_FORM_DATA: UploadFormData = {
	companyName: '',
	jobTitle: '',
	jobDescription: '',
	file: null,
}

export function UploadForm() {
	const { ai, fs, kv } = usePuterStore(
		useShallow((state) => ({
			ai: state.ai,
			fs: state.fs,
			kv: state.kv,
		}))
	)

	const [formData, setFormData] = useState<UploadFormData>(INITIAL_FORM_DATA)

	const [statusText, setStatusText] = useState<string>('')
	const [isProcessing, setIsProcessing] = useState<boolean>(false)
	const [isProcessingError, setIsProcessingError] = useState<boolean>(false)
	const [formErrors, setFormErrors] = useState<Record<string, string>>({})
	const navigate = useNavigate()

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))

		setFormErrors((prev) => ({
			...prev,
			[e.target.name]: '',
		}))
	}

	const handleFileSelect = (file: File | null) => {
		setFormData((prev) => ({
			...prev,
			file: file,
		}))

		setFormErrors((prev) => ({ ...prev, file: '' }))
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
			setIsProcessingError(true)
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

		setStatusText('Analyzing...')

		let feedback: AIResponse | undefined

		try {
			feedback = await ai.feedback(
				uploadedFile.path,
				prepareInstructions({ jobTitle, jobDescription })
			)
		} catch (err) {
			console.error('Failed to analyze resume:', err)
		}

		if (!feedback) {
			setStatusText('Error: Failed to analyze resume')
			setIsProcessingError(true)
			return
		}

		const feedbackText =
			typeof feedback.message.content === 'string'
				? feedback.message.content
				: feedback.message.content?.[0]?.text

		if (!feedbackText) {
			setStatusText('Error: Empty response from AI')
			setIsProcessingError(true)
			return
		}

		try {
			const cleanedText = feedbackText
				.trim()
				.replace(/^```(?:json)?\s*/i, '')
				.replace(/\s*```$/, '')
			data.feedback = JSON.parse(cleanedText)
		} catch (err) {
			console.error('Failed to parse AI feedback:', err, feedbackText)
			setStatusText('Error: Failed to parse AI response')
			setIsProcessingError(true)
			return
		}

		const savedData = await kv.set(`resume:${uuid}`, JSON.stringify(data))

		if (!savedData) {
			setStatusText('Error: Failed to save analysis')
			setIsProcessingError(true)
			return
		}

		setStatusText('Analysis complete. Redirecting...')
		navigate(`/resume/${uuid}`)
	}

	const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault()

		setFormErrors({})

		const dataValidation = uploadFormSchema.safeParse(formData)

		if (!dataValidation.success) {
			dataValidation.error.issues.forEach((err) => {
				const field = err.path[0] as string

				setFormErrors((prev) => ({ ...prev, [field]: err.message }))
			})
		}

		if (!formData.file)
			return setFormErrors((prev) => ({
				...prev,
				file: 'Resume PDF file is required',
			}))

		const { companyName, jobTitle, jobDescription, file } = formData

		if (dataValidation.success)
			handleAnalyze({ companyName, jobTitle, jobDescription, file })
	}

	if (isProcessing)
		return (
			<div className='card card-shadow mx-auto w-fit min-w-80 space-y-4 p-8 text-center'>
				<h2 className='font-heading font-semibold text-2xl'>{statusText}</h2>
				{!isProcessingError ? (
					<FileSearchCorner className='m-auto size-16 animate-pulse text-accent-foreground' />
				) : (
					<Button
						onClick={() => {
							setFormData(INITIAL_FORM_DATA)
							setStatusText('')
							setIsProcessingError(false)
							setIsProcessing(false)
							setFormErrors({})
						}}
						className='mx-auto'
					>
						<FileUp />
						<span>Retry Upload</span>
					</Button>
				)}
			</div>
		)

	return (
		<>
			<div className='mb-4 flex flex-col items-center justify-between md:flex-row'>
				<div>
					<h2 className='font-bold font-heading text-2xl'>
						Upload your resume
					</h2>
				</div>
				<p className='font-semibold text-muted-foreground'>
					<TextLink href='/'>
						<ArrowLeft />
						<span className='font-semibold'>Back to home</span>
					</TextLink>
				</p>
			</div>

			<div className='card card-shadow p-6 lg:p-10'>
				<form
					id='upload-form'
					onSubmit={handleSubmit}
					className='flex flex-col gap-8 md:flex-row lg:gap-12'
				>
					<div className='flex-1'>
						<div
							className={cn(
								'flex flex-col gap-2',
								formErrors.companyName ? 'mb-4' : 'mb-11'
							)}
						>
							<label htmlFor='companyName' className='font-semibold text-sm'>
								Company Name
							</label>
							<input
								type='text'
								id='companyName'
								name='companyName'
								placeholder='XYZ Company'
								value={formData.companyName}
								onChange={handleChange}
								className='form-input'
							/>
							{formErrors.companyName && (
								<p className='text-destructive text-sm'>
									{formErrors.companyName}
								</p>
							)}
						</div>
						<div
							className={cn(
								'flex flex-col gap-2',
								formErrors.jobTitle ? 'mb-4' : 'mb-11'
							)}
						>
							<label htmlFor='jobTitle' className='font-semibold text-sm'>
								Job Title
							</label>
							<input
								type='text'
								id='jobTitle'
								name='jobTitle'
								placeholder='Project Manager'
								value={formData.jobTitle}
								onChange={handleChange}
								className='form-input'
							/>
							{formErrors.jobTitle && (
								<p className='text-destructive text-sm'>
									{formErrors.jobTitle}
								</p>
							)}
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='jobDescription' className='font-semibold text-sm'>
								Job Description
							</label>
							<p className='text-muted-foreground text-sm'>
								Copy the entire job description from the job posting and paste
								it here.
							</p>
							<textarea
								rows={4}
								id='jobDescription'
								name='jobDescription'
								placeholder='Job summary, responsibilities, requirements'
								value={formData.jobDescription}
								onChange={handleChange}
								className='form-input flex-1 resize-none'
							/>
							{formErrors.jobDescription && (
								<p className='text-destructive text-sm'>
									{formErrors.jobDescription}
								</p>
							)}
						</div>
					</div>
					<div className='flex flex-1 flex-col justify-between gap-4'>
						<div className='flex flex-col gap-2'>
							<label htmlFor='uploader' className='font-semibold text-sm'>
								Upload Resume
							</label>
							<FileUploader
								inputId='uploader'
								file={formData.file}
								onFileSelect={handleFileSelect}
							/>
							{formErrors.file && (
								<p className='text-destructive text-sm'>{formErrors.file}</p>
							)}
						</div>
						<div
							className={cn(
								'flex flex-row gap-3',
								formErrors.jobDescription && 'md:mb-7'
							)}
						>
							<Button
								type='reset'
								variant='secondary'
								onClick={() => {
									setFormData(INITIAL_FORM_DATA)
									setFormErrors({})
								}}
							>
								<ListRestart />
								<span className='hidden sm:inline'>Reset</span>
							</Button>
							<Button
								type='submit'
								variant='primary'
								className='flex-1'
								disabled={isProcessing}
							>
								<FileSearchCorner />
								<span>Analyze Resume</span>
							</Button>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}
