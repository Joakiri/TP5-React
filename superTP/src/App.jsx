import { useState } from 'react'
import SearchBar from './componentes/SearchBar'
import MovieList from './componentes/MovieList'
import MovieDetail from './componentes/MovieDetail'
import Loader from './componentes/Loader'
import ErrorMessage from './componentes/ErrorMessage'
import useMovieSearch from './hooks/UseMovieSearch'
import useMovieDetail from './hooks/UseMovieDetail'
import './App.css'

function App() {
  const [query, setQuery]           = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const { movies, loading, error, totalResults } = useMovieSearch(query)
  const { movie, loading: detailLoading, error: detailError } = useMovieDetail(selectedId)

  const handleSearch = (newQuery) => {
    setQuery(newQuery)
    setSelectedId(null)
  }

  const handleSelect = (imdbID) => {
    setSelectedId(imdbID)
  }

  const handleBack = () => {
    setSelectedId(null)
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">CineSearch</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="app__main">

        {selectedId ? (
          <>
            {detailLoading && <Loader message="Cargando detalle..." />}
            {detailError && <ErrorMessage message={detailError} />}
            {movie && <MovieDetail movie={movie} onBack={handleBack} />}
          </>
        ) : (
          <>
            {loading  && <Loader message="Buscando..." />}
            {error    && <ErrorMessage message={error} />}
            {!loading && !error && (
              <MovieList movies={movies} onSelect={handleSelect} />
            )}
          </>
        )}

      </main>
    </div>
  )
}

export default App