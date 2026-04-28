import { useState, useEffect } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'http://www.omdbapi.com/?apikey=[yourkey]&'

function useMovieDetail(imdbID) {
  const [movie, setMovie]     = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!imdbID) {
      setMovie(null)
      setError(null)
      return
    }

    const controller = new AbortController()

    const fetchDetail = async () => {
      setLoading(true)
      setError(null)
      setMovie(null)

      try {
        const { data } = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            i: imdbID,
            plot: 'full',
          },
          signal: controller.signal,
        })

        if (data.Response === 'True') {
          setMovie(data)
        } else {
          setError(data.Error)
        }
      } catch (err) {
        if (axios.isCancel(err)) return
        setError('Error de red. Verificá tu conexión.')
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()

    return () => controller.abort()
  }, [imdbID])

  return { movie, loading, error }
}

export default useMovieDetail