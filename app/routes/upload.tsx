import { type SyntheticEvent, useState } from 'react'
import { Button } from '@/components/Button'
import { FileUploader } from '@/components/FileUploader'

export function meta() {
	return [
		{ title: 'Resume Analyzer | Upload' },
		{
			name: 'description',
			content: 'Upload your resume.',
		},
	]
}

export default function Upload() {
	const [isProcessing, _setIsProcessing] = useState(false)
	const [statusText, _setStatusText] = useState(false)
	const [file, setFile] = useState<File | null>(null)

	const handleFileSelect = (file: File | null) => {
		setFile(file)
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault()

		const form = e.currentTarget.closest('form')

		if (!form) return

		const formData = new FormData(form)

		const companyName = formData.get('company-name')
		const jobTitle = formData.get('job-title')
		const jobDescription = formData.get('job-description')

		console.log({ companyName, jobTitle, jobDescription, file })
	}

	return (
		<main className='flex h-screen items-center justify-center'>
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
								className='rounded-lg border border-gray-600 p-3'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='job-title'>Job Title</label>
							<input
								type='text'
								id='job-title'
								name='job-title'
								placeholder='Job Title'
								className='rounded-lg border border-gray-600 p-3'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='job-description'>Job Description</label>
							<textarea
								rows={4}
								id='job-description'
								name='job-description'
								placeholder='Job Description'
								className='rounded-lg border border-gray-600 p-3'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label htmlFor='uploader'>Upload Resume</label>
							<FileUploader onFileSelect={handleFileSelect} />
						</div>
						<Button type='submit'>Analyze Resume</Button>
					</form>
				)}
			</section>
		</main>
	)
}
