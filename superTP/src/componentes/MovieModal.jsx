import MovieDetail from './MovieDetail'
import Loader from './Loader'
import ErrorMessage from './ErrorMessage'
import useMovieDetail from '../hooks/UseMovieDetail'

function MovieModal({ imdbID, onClose }) {
  const { movie, loading, error } = useMovieDetail(imdbID)

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal__backdrop" onClick={handleBackdropClick}>
      <div className="modal__container">
        <button className="modal__close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        {loading && <Loader message="Cargando detalle..." />}
        {error   && <ErrorMessage message={error} />}
        {movie   && <MovieDetail movie={movie} />}
      </div>
    </div>
  )
}

export default MovieModal