import { Controller, useForm } from 'react-hook-form'
import Button from './button'
import Input from './input'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { useLink } from '../stores/link-store'

const bodySchema = z.object({
  originalUrl: z
    .string()
    .min(1, 'Informe uma url válida.')
    .refine((val) => {
      return /^((https?:\/\/)?[a-z0-9-]+(\.[a-z0-9-]+)+.*)$/i.test(val)
    }, 'Informe uma url válida.')
    .transform((val) => {
      if (val.startsWith('http://') || val.startsWith('https://')) {
        return val
      }
      return `https://${val}`
    }),
  customAlias: z
    .string()
    .min(1, 'Informe um url minuscula e sem espaços/caracteres especiais.')
    .max(30, 'O alias deve ter no máximo 30 caracteres.')
    .refine(
      (val) => {
        const value = val.replace(/^brev\.ly\/?/, '')
        return /^[a-z0-9-_]+$/.test(value)
      },
      {
        message: 'Informe um url minuscula e sem espaços/caracteres especiais.',
      },
    )
    .transform((val) => {
      const value = val.replace(/^brev\.ly\/?/, '')
      return value
    }),
})

type Body = z.infer<typeof bodySchema>

export default function CreateNewLinkForm() {
  const createNewShortLink = useLink((state) => state.createNewShortLink)

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Body>({
    defaultValues: {
      originalUrl: '',
      customAlias: '',
    },
    resolver: zodResolver(bodySchema),
    reValidateMode: 'onChange',
  })

  return (
    <form
      className="mt-5"
      onSubmit={handleSubmit((data) =>
        createNewShortLink(data.originalUrl, data.customAlias, reset),
      )}
    >
      <div className="flex flex-col gap-4 mb-5">
        <Input
          disabled={isSubmitting}
          label="Link Original"
          placeholder="www.exemplo.com.br"
          id="original-url"
          {...register('originalUrl')}
          error={errors.originalUrl?.message}
        />
        <Controller
          name="customAlias"
          control={control}
          render={({ field }) => (
            <Input
              disabled={isSubmitting}
              {...field}
              label="Link Encurtado"
              placeholder="brev.ly/"
              id="short-link"
              error={errors.customAlias?.message}
              onChange={(e) => {
                let value = e.target.value
                value = value.replace(/^brev\.ly\/?/, '')
                value = value.replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase()
                value = `brev.ly/${value}`

                field.onChange(value)
              }}
            />
          )}
        />
      </div>
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Salvando...' : 'Salvar Link'}
      </Button>
    </form>
  )
}
