import { Link } from 'react-router-dom'
import NotFoundImage from '../assets/not-found.png'

export default function NotFoundContent() {
  return (
    <>
      <img
        src={NotFoundImage}
        alt="Not Found"
        className="md:w-[177.05px] h-auto w-[149.67px]"
      />
      <h1 className="text-gray-600 text-2xl/[32px] font-bold">
        Redirecionando...
      </h1>
      <div className="text-center flex flex-col text-sm text-gray-500 font-semibold">
        <span>
          O link que você está tentando acessar não existe, foi removido ou é
          uma URL inválida. Saiba mais em{' '}
          <Link to={'/'} className="text-blue-base underline">
            brev.ly
          </Link>
          .
        </span>
      </div>
    </>
  )
}
