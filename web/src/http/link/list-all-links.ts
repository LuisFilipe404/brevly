type Link = {
  originalUrl: string
  id: string
  shortUrl: string
  accessCount: number
}

type ListAllLinksResponse = {
  links?: Link[]
  errorMessage?: string
}

export default async function ListAllLinks(): Promise<ListAllLinksResponse> {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/links`
    const method = 'GET'

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
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
      errorMessage: 'Não foi possível retornar os links encurtados.',
    }
  }
}
