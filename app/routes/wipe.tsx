import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useShallow } from 'zustand/shallow'

import { Button } from '@/components/ui/Button'
import type { FSItem } from '@/data/types/puter'
import { usePuterStore } from '@/lib/puter'

const WipeApp = () => {
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

	useEffect(() => {
		const loadFiles = async () => {
			const files = (await fs.readDir('./')) as FSItem[]
			setFiles(files)
		}

		loadFiles()
	}, [fs])

	useEffect(() => {
		if (!isLoading && !auth.isAuthenticated) {
			navigate('/auth?next=/wipe')
		}
	}, [isLoading, auth, navigate])

	const handleDelete = async () => {
		const loadFiles = async () => {
			const files = (await fs.readDir('./')) as FSItem[]
			setFiles(files)
		}

		await Promise.all(files.map((file) => fs.delete(file.path)))

		await kv.flush()
		await loadFiles()
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error {error}</div>
	}

	return (
		<div>
			Authenticated as: {auth.user?.username}
			<div>Existing files:</div>
			<div className='flex flex-col gap-4'>
				{files.map((file) => (
					<div key={file.id} className='flex flex-row gap-4'>
						<p>{file.name}</p>
					</div>
				))}
			</div>
			<div>
				<Button variant='destructive' onClick={() => handleDelete()}>
					<Trash />
					wipe app data
				</Button>
			</div>
		</div>
	)
}

export default WipeApp
