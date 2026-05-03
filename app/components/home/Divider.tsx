export function Divider() {
	return (
		<div className='relative'>
			<div className='squiggly-line -main absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2' />
			<div className='squiggly-line -stroke absolute top-3 left-1/2 -translate-x-24 -translate-y-1/2' />
			<div className='squiggly-line -stroke mx-auto my-12' />
		</div>
	)
}
