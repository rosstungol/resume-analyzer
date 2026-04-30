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

export type Tip = {
	type: 'good' | 'improve'
	tip: string
	explanation: string
}

type Category = {
	score: number
	tips: Tip[]
}

export type Feedback = {
	overallScore: number
	ATS: {
		score: number
		tips: Pick<Tip, 'type' | 'tip'>[]
	}
	toneAndStyle: Category
	content: Category
	structure: Category
	skills: Category
}
