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
		<div
			{...getRootProps()}
			className='w-full cursor-pointer rounded-lg border border-mauve-600 p-3'
		>
			<input {...getInputProps()} />

			<div>
				{file ? (
					<div className='flex items-center justify-between'>
						<div>
							<p className='max-w-80 truncate'>{file.name}</p>
							<p className='text-sm'>{formatSize(file.size)}</p>
						</div>
						<button
							type='button'
							className='cursor-pointer'
							onClick={() => onFileSelect?.(null)}
						>
							x
						</button>
					</div>
				) : (
					<div className='text-center'>
						<p>Upload</p>
						<p>Click to upload or drag and drop</p>
						<p className='text-sm'>PDF (max 20mb)</p>
					</div>
				)}
			</div>
		</div>
	)
}
