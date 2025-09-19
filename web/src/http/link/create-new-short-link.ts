import type { Link } from '../../stores/link-store'

type CreateNewShortLinkResponse = {
  errorMessage?: string
  data?: {
    id: string
    originalUrl: string
    customAlias: string
  }
}

export default async function CreateNewShortLink(
  input: Link,
): Promise<CreateNewShortLinkResponse> {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/links`
    const method = 'POST'

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    })

    const responseJson = await response.json()

    if (response.ok && responseJson) {
      return responseJson
    } else {
      return {
        errorMessage: responseJson.message || 'An error occurred.',
      }
    }
  } catch (error) {
    console.error('FunctionName Error:', error)

    return {
      errorMessage:
        'Não foi possível criar o link. Tente novamente mais tarde.',
    }
  }
}
