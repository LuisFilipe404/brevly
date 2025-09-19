import { Link } from 'react-router-dom'
import IconLogo from './icons/icon-logo'

export default function RedirectContent({
  originalUrl,
}: {
  originalUrl: string | null
}) {
  return (
    <>
      <IconLogo />
      <h1 className="text-gray-600 text-2xl/[32px] font-bold">
        Redirecionando...
      </h1>
      <div className="text-center flex flex-col text-sm text-gray-500 font-semibold">
        <span>O link será aberto automaticamente em alguns instantes.</span>
        <span>
          Não foi redirecionado?{' '}
          <Link to={originalUrl || '#'} className="text-blue-base underline">
            Acesse aqui
          </Link>
        </span>
      </div>
    </>
  )
}
