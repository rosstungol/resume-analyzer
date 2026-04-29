import type * as z from 'zod'

import type { uploadFormSchema } from '../schemas'

export type UploadFormData = z.infer<typeof uploadFormSchema>

export type ResumeFeedbackData = Pick<
	Resume,
	'jobTitle' | 'companyName' | 'feedback'
> & {
	fileUrl: string | null
}

export type Resume = {
	id: string
	companyName: string
	jobTitle: string
	resumePath: string
	feedback: Feedback | null
}

export type Suggestion = {
	type: 'good' | 'improve'
	tip: string
}

export type Tip = {
	type: 'good' | 'improve'
	tip: string
	explanation: string
}

export type Feedback = {
	overallScore: number
	ATS: {
		score: number
		tips: {
			type: 'good' | 'improve'
			tip: string
		}[]
	}
	toneAndStyle: {
		score: number
		tips: Tip[]
	}
	content: {
		score: number
		tips: {
			type: 'good' | 'improve'
			tip: string
			explanation: string
		}[]
	}
	structure: {
		score: number
		tips: {
			type: 'good' | 'improve'
			tip: string
			explanation: string
		}[]
	}
	skills: {
		score: number
		tips: {
			type: 'good' | 'improve'
			tip: string
			explanation: string
		}[]
	}
}
