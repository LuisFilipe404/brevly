import { useEffect, useState } from 'react'
import Button from './button'
import IconDownload from './icons/icon-download'
import IconLink from './icons/icon-link'
import Section from './section'
import SectionTitle from './section-title'
import { useLink } from '../stores/link-store'
import LinkCard from './link-card'
import GenerateReport from '../http/link/generate-report'
import toast from 'react-hot-toast'

export default function LinksList() {
  const fetchLinks = useLink((store) => store.fetchLinks)
  const links = useLink((store) => store.links)

  const [loading, setLoading] = useState(false)

  const arrayLinks = Array.from(links.entries())

  const generateCSV = async () => {
    if (loading) return
    setLoading(true)
    const result = await GenerateReport()

    if (result.errorMessage) {
      toast.error('Não foi possível gerar o relatório')
    }

    if (result.url) {
      window.open(result.url, '_blank', 'noopener,noreferrer')
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  return (
    <Section>
      <div className="flex items-center justify-between pb-4 border-b border-b-gray-200">
        <SectionTitle text="Meus links" />
        <Button
          disabled={loading || arrayLinks.length === 0}
          className="gap-1.5"
          variant="secondary"
          onClick={() => generateCSV()}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-t-transparent border-gray-500 rounded-full animate-spin" />
          ) : (
            <IconDownload width={16} height={16} />
          )}
          Baixar CSV
        </Button>
      </div>
      {arrayLinks.length > 0 ? (
        <ul className="*:[&:not(:last-child)]:border-b *:[&:not(:last-child)]:border-b-gray-200 max-h-[70vh] overflow-auto">
          {arrayLinks.map(([id, link]) => (
            <LinkCard
              id={id}
              key={id}
              customAlias={link.shortUrl}
              originalUrl={link.originalUrl}
              accessCount={link.accessCount}
            />
          ))}
        </ul>
      ) : (
        <div className="mt-4 flex flex-col gap-4 pt-4 pb-6 items-center">
          <IconLink className="text-gray-400" />
          <span className="text-center uppercase text-[10px]/[14px] text-gray-500">
            ainda não existem links cadastrados
          </span>
        </div>
      )}
    </Section>
  )
}
