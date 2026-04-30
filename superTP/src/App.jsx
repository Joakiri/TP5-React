import { useState } from 'react'
import SearchBar from './componentes/SearchBar'
import MovieList from './componentes/MovieList'
import MovieModal from './componentes/MovieModal'
import Loader from './componentes/Loader'
import ErrorMessage from './componentes/ErrorMessage'
import useMovieSearch from './hooks/UseMovieSearch'
import './App.css'

function App() {
  const [query, setQuery]           = useState('')
  const [selectedId, setSelectedId] = useState(null)

  const { movies, loading, error } = useMovieSearch(query)

  const handleSearch = (newQuery) => {
    setQuery(newQuery)
  }

  const handleSelect = (imdbID) => {
    setSelectedId(imdbID)
  }

  const handleClose = () => {
    setSelectedId(null)
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">CineSearch</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="app__main">
        {loading  && <Loader message="Buscando..." />}
        {error    && <ErrorMessage message={error} />}
        {!loading && !error && (
          <MovieList movies={movies} onSelect={handleSelect} />
        )}
      </main>

      {selectedId && (
        <MovieModal imdbID={selectedId} onClose={handleClose} />
      )}
    </div>
  )
}

export default App