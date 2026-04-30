import type { Tip } from '@/data/types'
import { cn } from '@/lib/utils'
import { StatusIcon } from './StatusIcon'

export function CategoryContent({ tips }: { tips: Tip[] }) {
	const tipsId = tips.map((item) => ({
		...item,
		id: crypto.randomUUID(),
	}))

	return (
		<div className='flex w-full flex-col items-center gap-4 sm:p-4'>
			<div className='grid w-full grid-cols-1 gap-4 rounded-lg border-2 p-3 md:grid-cols-2 md:p-6'>
				{tipsId.map((item) => (
					<div className='flex items-start gap-2' key={item.id}>
						<div className='py-0.5'>
							<StatusIcon type={item.type} />
						</div>
						<p className='text-xl'>{item.tip}</p>
					</div>
				))}
			</div>
			<div className='flex w-full flex-col gap-4'>
				{tipsId.map((item) => (
					<div
						key={item.id}
						className={cn(
							'flex flex-col gap-2 rounded-lg border-2 p-4',
							item.type === 'good'
								? 'border-success bg-teal-50'
								: 'border-warning bg-amber-50'
						)}
					>
						<div className='flex gap-2 md:items-center'>
							<div className='py-0.5'>
								<StatusIcon type={item.type} />
							</div>
							<p className='font-semibold text-xl'>{item.tip}</p>
						</div>
						<p>{item.explanation}</p>
					</div>
				))}
			</div>
		</div>
	)
}
