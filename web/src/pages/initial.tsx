import Main from '../components/main'
import Logo from '../assets/Logo.png'

import { Toaster } from 'react-hot-toast'

function Initial() {
  return (
    <div className="py-8 px-3 flex flex-col items-center md:items-start lg:px-[100px] lg:pt-[88px] xl:px-[193px]">
      <h1 className="mb-[23.71px]">
        <img src={Logo} alt="Brev.ly Logo" className="w-[96.67px] h-auto" />
        <span className="sr-only">Brev.ly</span>
      </h1>
      <Main />
      <Toaster
        position="bottom-center"
        containerClassName="w-full max-w-full"
        toastOptions={{
          success: {
            style: {
              background: '#12B76A',
              color: '#fff',
              fontWeight: 500,
              fontSize: '1.125rem',
              maxWidth: '70%',
              borderRadius: '16px',
            },
            iconTheme: {
              primary: '#027A48',
              secondary: '#fff',
            },
          },
          error: {
            style: {
              background: '#F04438',
              color: '#fff',
              fontWeight: 500,
              fontSize: '1.125rem',
              maxWidth: '70%',
              borderRadius: '16px',
            },
            iconTheme: {
              primary: '#B42318',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}

export default Initial
