import { twMerge } from 'tailwind-merge'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center font-semibold cursor-pointer',
  variants: {
    variant: {
      primary:
        'bg-blue-base hover:bg-blue-dark text-white py-[15px] w-full  rounded-[8px] text-sm/[18px] hover:disabled:bg-blue-base',
      secondary:
        'bg-gray-200 rounded-[4px] p-2 text-xs text-gray-500 hover:ring-1 hover:ring-blue-base hover:disabled:ring-0',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof button>

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      type={props.type || 'button'}
      {...props}
      className={twMerge(
        button({
          variant: props.variant,
        }),
        className,
      )}
    >
      {children}
    </button>
  )
}
