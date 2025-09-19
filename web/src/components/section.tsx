import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
}

export default function Section({ children }: SectionProps) {
  return (
    <section className="w-full bg-white p-6 rounded-[8px]">{children}</section>
  )
}
