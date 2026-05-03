import { type RefObject, useEffect, useState } from 'react'

export function useIsVisible(ref: RefObject<Element | null>) {
	const [isIntersecting, setIntersecting] = useState(false)

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIntersecting(true)
				observer.disconnect()
			}
		})

		if (ref.current != null) observer.observe(ref.current)

		return () => {
			observer.disconnect()
		}
	}, [ref])

	return isIntersecting
}
