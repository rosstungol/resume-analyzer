import clsx from 'clsx'
import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'

type AccordionContextType = {
	activeItems: string[]
	toggleItem: (id: string) => void
	isItemActive: (id: string) => boolean
}

const AccordionContext = createContext<AccordionContextType | undefined>(
	undefined
)

const useAccordion = () => {
	const context = useContext(AccordionContext)
	if (!context) {
		throw new Error('Accordion components must be used within an Accordion')
	}
	return context
}

type AccordionProps = {
	children: ReactNode
	defaultOpen?: string
	allowMultiple?: boolean
	className?: string
}

export function Accordion({
	children,
	defaultOpen,
	allowMultiple = false,
	className = '',
}: AccordionProps) {
	const [activeItems, setActiveItems] = useState<string[]>(
		defaultOpen ? [defaultOpen] : []
	)

	const toggleItem = (id: string) => {
		setActiveItems((prev) => {
			if (allowMultiple) {
				return prev.includes(id)
					? prev.filter((item) => item !== id)
					: [...prev, id]
			} else {
				return prev.includes(id) ? [] : [id]
			}
		})
	}

	const isItemActive = (id: string) => activeItems.includes(id)

	return (
		<AccordionContext.Provider
			value={{ activeItems, toggleItem, isItemActive }}
		>
			<div
				className={`space-y-2 rounded-lg border border-gray-600 shadow-md ${className}`}
			>
				{children}
			</div>
		</AccordionContext.Provider>
	)
}

type AccordionItemProps = {
	id: string
	withBorder?: boolean
	className?: string
	children: ReactNode
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
	id,
	children,
	className = '',
	withBorder = true,
}) => {
	return (
		<div
			id={id}
			className={clsx(
				'overflow-hidden',
				withBorder && 'border-gray-200 border-b',
				className
			)}
		>
			{children}
		</div>
	)
}

type AccordionHeaderProps = {
	itemId: string
	children: ReactNode
	className?: string
	icon?: ReactNode
	iconPosition?: 'left' | 'right'
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
	itemId,
	children,
	className = '',
	icon,
	iconPosition = 'right',
}) => {
	const { toggleItem, isItemActive } = useAccordion()
	const isActive = isItemActive(itemId)

	const defaultIcon = (
		<svg
			className={clsx('h-5 w-5 transition-transform duration-200', {
				'rotate-180': isActive,
			})}
			fill='none'
			stroke='#98A2B3'
			viewBox='0 0 24 24'
			xmlns='http://www.w3.org/2000/svg'
		>
			<title>default icon</title>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M19 9l-7 7-7-7'
			/>
		</svg>
	)

	const handleClick = () => {
		toggleItem(itemId)
	}

	return (
		<button
			type='button'
			onClick={handleClick}
			className={`flex w-full cursor-pointer items-center justify-between px-4 py-3 text-left transition-colors duration-200 focus:outline-none ${className}
      `}
		>
			<div className='flex items-center space-x-3'>
				{iconPosition === 'left' && (icon || defaultIcon)}
				<div className='flex-1'>{children}</div>
			</div>
			{iconPosition === 'right' && (icon || defaultIcon)}
		</button>
	)
}

type AccordionContentProps = {
	itemId: string
	children: ReactNode
	className?: string
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
	itemId,
	children,
	className = '',
}) => {
	const { isItemActive } = useAccordion()
	const isActive = isItemActive(itemId)

	return (
		<div
			className={`overflow-hidden transition-all duration-300 ease-in-out ${isActive ? 'max-h-fit opacity-100' : 'max-h-0 opacity-0'}
        ${className}

      `}
		>
			<div className='px-4 py-3'>{children}</div>
		</div>
	)
}
