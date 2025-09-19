type GetOriginalUrlByAliasResponse = {
  originalUrl?: string
  errorMessage?: string
}

export default async function GetOriginalUrlByAlias(
  alias: string,
): Promise<GetOriginalUrlByAliasResponse> {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/links/original-url/${alias}`
    const method = 'GET'

    const response = await fetch(url, {
      method,
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
    console.error('GetOriginalUrlByAlias Error:', error)

    return {
      errorMessage: 'Erro Interno do Servidor',
    }
  }
}
