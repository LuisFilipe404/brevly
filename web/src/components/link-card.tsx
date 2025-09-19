import toast from 'react-hot-toast'
import Button from './button'
import IconCopy from './icons/icon-copy'
import IconTrash from './icons/icon-trash'
import DeleteLink from '../http/link/delete-link'
import { useLink } from '../stores/link-store'
import { Link } from 'react-router-dom'

interface LinkCardProps {
  customAlias: string
  originalUrl: string
  accessCount: number
  id: string
}

export default function LinkCard({
  customAlias,
  originalUrl,
  accessCount,
  id,
}: LinkCardProps) {
  const deleteLink = useLink((store) => store.deleteLink)

  const onCopyToClipboard = () => {
    navigator.clipboard.writeText(
      `${import.meta.env.VITE_FRONTEND_URL}/${customAlias}`,
    )

    toast.success('Link copiado!')
  }

  const onDeleteLink = async () => {
    const answer = confirm(
      `Tem certeza que deseja deletar o link ${import.meta.env.VITE_FRONTEND_URL}/${customAlias}`,
    )

    if (answer) {
      const result = await DeleteLink(id)

      if (result.message) {
        deleteLink(id)
        return
      }
    }
  }

  return (
    <li className="py-4 flex justify-between items-center w-full">
      <div className="flex flex-col">
        <Link
          className="text-sm/[18px] text-blue-base font-semibold mb-1 inline-block"
          to={`/${customAlias}`}
        >
          {import.meta.env.VITE_FRONTEND_URL}/{customAlias}
        </Link>
        <span className="text-xs text-gray-500">
          {originalUrl.replace('https://', '')}
        </span>
      </div>
      <div className="flex items-center gap-1 mr-0.5">
        <span className="text-xs text-gray-500 mr-4">
          {accessCount || 0}{' '}
          {accessCount > 1 || accessCount === 0 ? 'acessos' : 'acesso'}
        </span>
        <Button onClick={onCopyToClipboard} variant="secondary">
          <IconCopy width={16} height={16} />
        </Button>
        <Button onClick={onDeleteLink} variant="secondary">
          <IconTrash width={16} height={16} />
        </Button>
      </div>
    </li>
  )
}
