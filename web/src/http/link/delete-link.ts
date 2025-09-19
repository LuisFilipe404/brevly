'use server'

type DeleteLinkOutput = {
  message?: string
  errorMessage?: string
}

export default async function DeleteLink(
  id: string,
): Promise<DeleteLinkOutput> {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/links/${id}`
    const method = 'DELETE'

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
    console.error('DeleteLink Error:', error)

    return {
      errorMessage: 'Não foi possível deletar o link.',
    }
  }
}
