const API_KEY = '9e3bce1f'
const API_URL = 'http://www.omdbapi.com'

export function useOmdb() {
  const searchMedia = async (query, type) => {
    const params = new URLSearchParams({
      apikey: API_KEY,
      s: query,
      ...(type && { type })
    })
    
    const response = await fetch(`${API_URL}?${params}`)
    const data = await response.json()
    return data
  }

  const getMediaById = async (id) => {
    const params = new URLSearchParams({
      apikey: API_KEY,
      i: id,
      plot: 'full'
    })
    
    const response = await fetch(`${API_URL}?${params}`)
    const data = await response.json()
    return data
  }

  return {
    searchMedia,
    getMediaById
  }
} 