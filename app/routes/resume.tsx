import { Link, useNavigate, useParams } from 'react-router'

import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/shallow'
import { ATS } from '@/components/ATS'
import { Details } from '@/components/Details'
import { Summary } from '@/components/Summary'
import type { Feedback } from '@/data/types'
import { usePuterStore } from '@/lib/puter'

export function meta() {
  return [
    { title: 'Resume Analyzer | Resume' },
    {
      name: 'description',
      content: 'Detailed overview of your resume',
    },
  ]
}

export default function Resume() {
  const { auth, fs, isLoading, kv } = usePuterStore(
    useShallow((state) => ({
      auth: state.auth,
      fs: state.fs,
      isLoading: state.isLoading,
      kv: state.kv,
    })),
  )

  const { id } = useParams()
  const [resumeUrl, setResumeUrl] = useState('')
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate(`/auth?next=/resume/${id}`)
  }, [auth.isAuthenticated, navigate, id, isLoading])

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`)

      if (!resume) return

      const data = JSON.parse(resume)

      const resumeBlob = await fs.read(data.resumePath)
      if (!resumeBlob) return

      const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' })
      const resumeUrl = URL.createObjectURL(pdfBlob)
      setResumeUrl(resumeUrl)

      setFeedback(data.feedback)

      console.log({ resumeUrl, feedback: data.feedback })
    }

    loadResume()
  }, [id, fs.read, kv.get])

  return (
    <>
      <nav className='p-8'>
        <Link to='/'>⬅ back to home</Link>
      </nav>
      <main className='p-8'>
        <a href={resumeUrl} target='_blank' rel='noopener noreferrer'>
          resume
        </a>
        <h1>Resume Review</h1>
        {feedback && (
          <div>
            <Summary />
            <ATS /> <Details />
          </div>
        )}
      </main>
    </>
  )
}
