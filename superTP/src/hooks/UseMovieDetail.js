import { useState, useEffect } from 'react'
import axios from 'axios'
 
const API_KEY = import.meta.env.VITE_OMDB_API_KEY
const BASE_URL = 'http://www.omdbapi.com/?apikey=[yourkey]&'
 
function useMovieSearch(query) {
  const [movies, setMovies]           = useState([])
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState(null)
  const [totalResults, setTotalResults] = useState(0)
 
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setMovies([])
      setError(null)
      setTotalResults(0)
      return
    }
 
    const controller = new AbortController()
 
    const fetchMovies = async () => {
      setLoading(true)
      setError(null)
 
      try {
        const { data } = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            s: query.trim(),
          },
          signal: controller.signal,
        })
 
        if (data.Response === 'True') {
          setMovies(data.Search)
          setTotalResults(parseInt(data.totalResults))
        } else {
          setMovies([])
          setTotalResults(0)
          setError(data.Error)
        }
      } catch (err) {
        if (axios.isCancel(err)) return
        setError('Error de red. Verificá tu conexión.')
      } finally {
        setLoading(false)
      }
    }
 
    fetchMovies()
 
    return () => controller.abort()
  }, [query])
 
  return { movies, loading, error, totalResults }
}
 
export default useMovieSearch