import { useState } from 'react'
import SearchBar from './componentes/SearchBar'
import MovieList from './componentes/MovieList'
import MovieModal from './componentes/MovieModal'
import FilterBar from './componentes/FilterBar'
import Loader from './componentes/Loader'
import ErrorMessage from './componentes/ErrorMessage'
import useMovieSearch from './hooks/UseMovieSearch'
import './App.css'

function App() {
  const [query, setQuery]           = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [typeFilter, setTypeFilter] = useState('')

  const { movies, loading, error } = useMovieSearch(query, typeFilter)

  const handleSearch = (newQuery) => {
    setQuery(newQuery)
    setTypeFilter('')
  }

  const handleSelect = (imdbID) => {
    setSelectedId(imdbID)
  }

  const handleClose = () => {
    setSelectedId(null)
  }

  const handleFilterChange = (type) => {
    setTypeFilter(type)
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">CineSearch</h1>
        <SearchBar onSearch={handleSearch} />
      </header>

      <main className="app__main">
        {query && (
          <FilterBar
            activeFilter={typeFilter}
            onFilterChange={handleFilterChange}
          />
        )}

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