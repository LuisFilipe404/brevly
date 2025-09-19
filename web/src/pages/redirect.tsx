import { useEffect, useState } from 'react'
import GetOriginalUrlByAlias from '../http/link/get-original-url-by-alias'
import { useParams } from 'react-router-dom'
import RedirectContent from '../components/redirect-content'
import NotFoundContent from '../components/not-found-content'

export default function Redirect() {
  const { customAlias } = useParams()

  const [originalUrl, setOriginalUrl] = useState<string | null>(null)
  const [error, setError] = useState<boolean>(false)

  const redirect = async () => {
    const result = await GetOriginalUrlByAlias(customAlias || '')

    if (result.originalUrl) {
      setOriginalUrl(result.originalUrl)
      window.location.href = result.originalUrl
      return
    }

    setError(true)
  }

  useEffect(() => {
    redirect()
  }, [])

  return (
    <div className="flex items-center justify-center h-dvh px-3">
      <div className="w-full bg-white px-12 py-16 max-w-[580px] rounded-[8px] flex-col flex items-center justify-center gap-6">
        {error ? (
          <NotFoundContent />
        ) : (
          <RedirectContent originalUrl={originalUrl} />
        )}
      </div>
    </div>
  )
}
