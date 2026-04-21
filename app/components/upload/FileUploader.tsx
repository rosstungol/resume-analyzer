import { CircleX } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { formatSize } from '@/lib/utils'

export function FileUploader({
	selectedFile,
	onFileSelect,
}: {
	selectedFile: File | null
	onFileSelect: (file: File | null) => void
}) {
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
			<input {...getInputProps()} />

			<div className='form-input w-full cursor-pointer'>
				{selectedFile ? (
					<div className='relative h-60 flex-center flex-col'>
						<h3 className='line-clamp-2 text-balance font-heading font-semibold text-2xl'>
							{selectedFile.name}
						</h3>
						<p className='text-muted-foreground text-sm'>
							{formatSize(selectedFile.size)}
						</p>
						<button
							type='button'
							className='absolute top-1 right-1 cursor-pointer'
							onClick={(e) => {
								e.stopPropagation()
								e.preventDefault()
								onFileSelect?.(null)
							}}
						>
							<CircleX />
						</button>
					</div>
				) : (
					<div className='h-60 flex-center flex-col'>
						<h3 className='font-heading font-semibold text-2xl'>Upload</h3>
						<p>Click to upload or drag and drop</p>
						<p className='text-muted-foreground text-sm'>PDF (max 20 MB)</p>
					</div>
				)}
			</div>
		</div>
	)
}
