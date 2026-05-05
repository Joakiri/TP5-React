import MovieCard from './MovieCard'
 
function MovieList({ movies, onSelect }) {
  if (movies.length === 0) {
    return (
      <p className="movie-list__empty">
        No se encontraron resultados.
      </p>
    )
  }
 
  return (
    <ul className="movie-list">
      {movies.map((movie) => (
  <li key={movie.imdbID}>
    <MovieCard movie={movie} onSelect={onSelect} />
  </li>
))}
    </ul>
  )
}
 
export default MovieList
 