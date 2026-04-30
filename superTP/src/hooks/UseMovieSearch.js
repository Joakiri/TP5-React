import { useState, useEffect } from 'react'
import { searchMovies } from '../services/API'

function useMovieSearch(query) {
  const [movies, setMovies]             = useState([])
  const [loading, setLoading]           = useState(false)
  const [error, setError]               = useState(null)
  const [totalResults, setTotalResults] = useState(0)

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setMovies([])
      setError(null)
      setTotalResults(0)
      return
    }

    const fetchMovies = async () => {
      setLoading(true)
      setError(null)

      try {
        const { data } = await searchMovies(query)

        if (data.Response === 'True') {
          setMovies(data.Search)
          setTotalResults(parseInt(data.totalResults))
        } else {
          setMovies([])
          setTotalResults(0)
          setError(data.Error)
        }
      } catch (err) {
        setError('Error de red. Verificá tu conexión.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [query])

  return { movies, loading, error, totalResults }
}

export default useMovieSearch