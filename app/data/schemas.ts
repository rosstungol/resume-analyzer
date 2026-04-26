import * as z from 'zod'

export const uploadFormSchema = z.object({
	companyName: z.string().min(1, 'Company name is required'),
	jobTitle: z.string().min(1, 'Job title is required'),
	jobDescription: z.string().min(1, 'Job description is required'),
	file: z
		.file()
		.max(20 * 1024 * 1024, 'Max file size is 20 MB')
		.mime('application/pdf', 'Only PDF format is supported.')
		.nullable(),
})
