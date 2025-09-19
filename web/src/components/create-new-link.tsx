import CreateNewLinkForm from './create-new-link-form'
import Section from './section'
import SectionTitle from './section-title'

export default function CreateNewLink() {
  return (
    <Section>
      <SectionTitle text="Novo link" />
      <CreateNewLinkForm />
    </Section>
  )
}
