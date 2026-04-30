import { Trash, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '../ui/Button'

type ModalProps = {
	open: boolean
	onClose: () => void
	action: () => void
}

export function Modal({ open, onClose, action }: ModalProps) {
	const dialogRef = useRef<HTMLDialogElement | null>(null)
	const [inputValue, setInputValue] = useState<string>('')

	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return

		if (open && !dialog.open) {
			dialog.showModal()
		} else if (!open && dialog.open) {
			dialog.close()
		}
	}, [open])

	const isConfirmationValid = inputValue.toLowerCase() === 'delete all data'

	return (
		<dialog
			ref={dialogRef}
			onClose={onClose}
			className='card card-shadow fade-in zoom-in backdrop:fade-in fixed m-auto max-w-80 starting:scale-95 animate-in justify-between rounded-lg p-8 starting:opacity-0 duration-200 backdrop:animate-in backdrop:bg-black/20 backdrop:starting:opacity-0 backdrop:backdrop-blur-sm backdrop:duration-300 sm:max-w-96'
		>
			<div className='mb-4'>
				<h2 className='mb-2 font-bold font-heading text-2xl'>Delete Data</h2>
				<p className='text-pretty'>
					Are you sure about deleting all data? This is an irreversible action.
				</p>
			</div>
			<div className='mb-6'>
				<p className='mb-2 text-pretty'>Type "delete all data" to proceed.</p>
				<input
					type='text'
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					className='form-input w-full'
				/>
			</div>
			<Button
				type='button'
				variant='destructive'
				className='w-full'
				disabled={!isConfirmationValid}
				onClick={() => {
					action()
					dialogRef.current?.close()
				}}
			>
				<Trash />
				Delete All Files
			</Button>
			<button
				type='button'
				onClick={() => dialogRef.current?.close()}
				className='absolute top-3 right-3 cursor-pointer'
			>
				<X />
			</button>
		</dialog>
	)
}
