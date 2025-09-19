'use server'

type ReportResponse = {
  url?: string
  errorMessage?: string
}

export default async function GenerateReport(): Promise<ReportResponse> {
  try {
    const url = `${import.meta.env.VITE_BACKEND_URL}/links/uploads`
    const method = 'POST'

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
    console.error('GenerateReport Error:', error)

    return {
      errorMessage: 'Não foi possível criar o relatório.',
    }
  }
}
