import { ArrowLeft, FileText, House, Loader, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import { useShallow } from 'zustand/shallow'

import { GridBlankState } from '@/components/home/GridBlankState'
import { Navbar } from '@/components/layout/Navbar'
import { AuthButton } from '@/components/ui/AuthButton'
import { Button } from '@/components/ui/Button'
import { TextLink } from '@/components/ui/TextLink'
import { Modal } from '@/components/wipe/Modal'
import type { FSItem } from '@/data/types/puter'
import { usePuterStore } from '@/lib/puter'

export default function WipePage() {
	const { auth, isLoading, error, fs, kv } = usePuterStore(
		useShallow((state) => ({
			auth: state.auth,
			isLoading: state.isLoading,
			error: state.error,
			fs: state.fs,
			kv: state.kv,
		}))
	)

	const navigate = useNavigate()
	const [files, setFiles] = useState<FSItem[]>([])
	const [loadingFiles, setLoadingFiles] = useState<boolean>(
		auth.isAuthenticated
	)
	const [openModal, setOpenModal] = useState(false)

	useEffect(() => {
		let cancelled = false

		if (!auth.isAuthenticated) {
			setFiles([])
			setLoadingFiles(false)
			return
		}

		const loadFiles = async () => {
			setLoadingFiles(true)

			try {
				const files = (await fs.readDir('./')) as FSItem[]

				if (!cancelled) setFiles(files)
			} catch (error) {
				console.error('Failed to load files:', error)

				if (!cancelled) setFiles([])
			} finally {
				if (!cancelled) setLoadingFiles(false)
			}
		}

		loadFiles()

		return () => {
			cancelled = true
		}
	}, [auth.isAuthenticated, fs])

	const handleDelete = async () => {
		const loadFiles = async () => {
			const files = (await fs.readDir('./')) as FSItem[]
			setFiles(files)
		}

		await Promise.all(files.map((file) => fs.delete(file.path)))

		await kv.flush()
		await loadFiles()
	}

	if (error) {
		return (
			<>
				<Navbar />
				<main className='mx-auto flex-center pt-16 sm:m-4'>
					<div className='card card-shadow mx-auto w-fit p-8 text-center sm:max-w-full'>
						<div className='mb-6'>
							<h2 className='mb-2 font-bold font-heading text-2xl'>
								Something went wrong
							</h2>
							<p>{error}</p>
						</div>
						<Button onClick={() => navigate('/')} className='mx-auto'>
							<House />
							Go Home
						</Button>
					</div>
				</main>
			</>
		)
	}

	if (!isLoading && !auth.isAuthenticated) {
		return <Navigate to='/' replace />
	}

	return (
		<>
			<Navbar>
				{!isLoading ? (
					<>
						<AuthButton />
						<Button
							variant='destructive'
							onClick={() => setOpenModal(true)}
							disabled={files.length === 0}
						>
							<Trash />
							Delete All Files
						</Button>
					</>
				) : (
					<Loader className='size-8 animate-spin text-accent-foreground' />
				)}
			</Navbar>

			{openModal && (
				<Modal
					open={openModal}
					onClose={() => setOpenModal(false)}
					action={handleDelete}
				/>
			)}

			<section className='my-8 lg:m-12'>
				{loadingFiles && (
					<Loader className='m-auto size-16 animate-spin text-accent-foreground' />
				)}

				{!loadingFiles && files.length > 0 && (
					<>
						<div className='mb-4 flex flex-col-reverse items-center justify-between gap-4 md:flex-row'>
							<div>
								<h2 className='font-bold font-heading text-2xl'>
									Existing Files
								</h2>
							</div>
							<p className='font-semibold text-muted-foreground'>
								<TextLink href='/'>
									<ArrowLeft />
									<span className='font-semibold'>Back to home</span>
								</TextLink>
							</p>
						</div>
						<h3 className='mb-4 text-center md:text-left'>
							<span className='mr-2'>Username:</span>
							<span className='font-heading font-semibold'>
								{auth.user?.username}
							</span>
						</h3>
						<div className='card card-shadow p-6 lg:p-10'>
							<div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
								{files.map((file) => (
									<div key={file.id} className='flex gap-1'>
										<div className='size-6'>
											<FileText />
										</div>
										<p className='line-clamp-3'>{file.name}</p>
									</div>
								))}
							</div>
						</div>
					</>
				)}

				{!loadingFiles && files.length === 0 && (
					<GridBlankState message='Upload your resume to see your files here.' />
				)}
			</section>
		</>
	)
}
