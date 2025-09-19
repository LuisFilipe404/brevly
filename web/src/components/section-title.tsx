interface SectionTitleProps {
  text: string
}

export default function SectionTitle({ text }: SectionTitleProps) {
  return <h1 className="text-lg/[24px] font-bold text-gray-600">{text}</h1>
}
