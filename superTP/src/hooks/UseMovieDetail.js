import { useState, useEffect } from 'react'
import { getMovieDetail } from '../services/API'

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

    const fetchDetail = async () => {
      setLoading(true)
      setError(null)
      setMovie(null)

      try {
        const { data } = await getMovieDetail(imdbID)

        if (data.Response === 'True') {
          setMovie(data)
        } else {
          setError(data.Error)
        }
      } catch (err) {
        setError('Error de red. Verificá tu conexión.')
      } finally {
        setLoading(false)
      }
    }

    fetchDetail()
  }, [imdbID])

  return { movie, loading, error }
}

export default useMovieDetail