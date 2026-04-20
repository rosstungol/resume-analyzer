import { CircleX } from 'lucide-react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import { formatSize } from '@/lib/utils'

export function FileUploader({
	onFileSelect,
}: {
	onFileSelect: (file: File | null) => void
}) {
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const file = acceptedFiles[0] || null
			onFileSelect?.(file)
		},
		[onFileSelect]
	)

	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		onDrop,
		multiple: false,
		accept: { 'application/pdf': ['.pdf'] },
		maxSize: 20 * 1024 * 1024,
	})

	const file = acceptedFiles[0] || null

	return (
		<div {...getRootProps()} className='form-input w-full cursor-pointer'>
			<input id='uploader' {...getInputProps()} />

			<div>
				{file ? (
					<div className='relative h-60 flex-center flex-col'>
						<h3 className='line-clamp-2 text-balance font-heading font-semibold text-2xl'>
							{file.name}
						</h3>
						<p className='text-muted-foreground text-sm'>
							{formatSize(file.size)}
						</p>
						<button
							type='button'
							className='absolute top-1 right-1 cursor-pointer'
							onClick={() => onFileSelect?.(null)}
						>
							<CircleX />
						</button>
					</div>
				) : (
					<div className='h-60 flex-center flex-col'>
						<h3 className='font-heading font-semibold text-2xl'>Upload</h3>
						<p>Click to upload or drag and drop</p>
						<p className='text-muted-foreground text-sm'>PDF (max 20mb)</p>
					</div>
				)}
			</div>
		</div>
	)
}
