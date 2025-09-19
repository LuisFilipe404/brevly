import type { ComponentProps } from 'react'
import IconWarning from './icons/icon-warning'
import { twMerge } from 'tailwind-merge'

interface InputProps extends ComponentProps<'input'> {
  label: string
  id: string
  error?: string
}

export default function Input({ label, id, error, ...props }: InputProps) {
  return (
    <div className="group flex flex-col gap-2">
      <label
        className={twMerge(
          'uppercase text-[10px]/[14px] text-gray-500 group-focus-within:text-blue-base group-focus-within:font-bold transition-all',
          error && 'text-danger font-bold group-focus-within:text-danger',
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        {...props}
        type="text"
        className={twMerge(
          'placeholder:text-gray-400 outline-none text-sm/[18px] rounded-[8px] ring-1 ring-gray-300 focus:ring-[1.5px] focus:ring-blue-base px-4 py-[15px] text-gray-600 transition-all',
          error && 'ring-danger focus:ring-danger ring-[1.5px]',
        )}
      />
      {error && (
        <div className="flex items-center gap-[9px]">
          <IconWarning width={16} height={16} className="text-danger size-4" />
          <span className="text-xs/[12px] text-gray-500">{error}</span>
        </div>
      )}
    </div>
  )
}
