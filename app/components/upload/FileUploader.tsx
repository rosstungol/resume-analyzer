import { CircleX } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { formatSize } from '@/lib/utils'

type FileUploaderProps = {
	inputId: string
	file: File | null
	onFileSelect: (file: File | null) => void
}

export function FileUploader({
	inputId,
	file,
	onFileSelect,
}: FileUploaderProps) {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0] || null
			onFileSelect?.(file)
		},
		[onFileSelect]
	)

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		multiple: false,
		accept: { 'application/pdf': ['.pdf'] },
		maxSize: 20 * 1024 * 1024,
	})

	return (
		<div {...getRootProps()}>
			<input {...getInputProps()} id={inputId} />

			<div className='form-input w-full cursor-pointer'>
				{file ? (
					<div className='relative h-48 flex-center flex-col'>
						<h3 className='line-clamp-2 text-balance font-heading font-semibold text-2xl'>
							{file.name}
						</h3>
						<p className='text-muted-foreground text-sm'>
							{formatSize(file.size)}
						</p>
						<button
							type='button'
							aria-label='Remove selected file'
							className='absolute top-1 right-1 cursor-pointer'
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								onFileSelect?.(null)
							}}
						>
							<CircleX aria-hidden='true' />
						</button>
					</div>
				) : (
					<div className='h-48 flex-center flex-col'>
						<h3 className='font-heading font-semibold text-2xl'>Upload</h3>
						<p>Click to upload or drag and drop</p>
						<p className='text-muted-foreground text-sm'>PDF (max 20 MB)</p>
					</div>
				)}
			</div>
		</div>
	)
}
