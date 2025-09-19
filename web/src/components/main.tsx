import CreateNewLink from './create-new-link'
import LinksList from './links-list'

export default function Main() {
  return (
    <main className="flex flex-col gap-3 w-full md:grid md:grid-cols-[380px_1fr] md:gap-5 md:items-start">
      <CreateNewLink />
      <LinksList />
    </main>
  )
}
