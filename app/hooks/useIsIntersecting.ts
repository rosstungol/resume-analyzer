import { type RefObject, useEffect, useState } from 'react'

export function useIsVisible(ref: RefObject<HTMLParagraphElement | null>) {
	const [isIntersecting, setIntersecting] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIntersecting(entry.isIntersecting)
		})

		if (ref.current != null) observer.observe(ref.current)

		return () => {
			observer.disconnect()
		}
	}, [ref])

	return isIntersecting
}
