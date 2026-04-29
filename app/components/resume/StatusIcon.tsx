import { BadgeAlert, BadgeCheck } from 'lucide-react'

export function StatusIcon({ type }: { type: 'good' | 'improve' }) {
	return type === 'good' ? (
		<div className='size-6'>
			<BadgeCheck className='text-success' />
		</div>
	) : (
		<div className='size-6'>
			<BadgeAlert className='text-warning' />
		</div>
	)
}
