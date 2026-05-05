import posterVacio from '../assets/posterVacio.jpg'

const TYPE_LABELS = {
  movie: 'Película',
  series: 'Serie',
  episode: 'Episodio',
}

const POSTER_FALLBACK = posterVacio

function MovieCard({ movie, onSelect }) {
  const { imdbID, Title, Year, Type, Poster } = movie

  const typeLabel = TYPE_LABELS[Type] ?? Type
  const posterSrc = Poster !== 'N/A' ? Poster : POSTER_FALLBACK

  return (
    <article className="movie-card" onClick={() => onSelect(imdbID)}>
      <img
        className="movie-card__poster"
        src={posterSrc}
        alt={`Póster de ${Title}`}
      />
      <div className="movie-card__info">
        <span className="movie-card__type">{typeLabel}</span>
        <h3 className="movie-card__title">{Title}</h3>
        <p className="movie-card__year">{Year !== 'N/A' ? Year : '—'}</p>
      </div>
    </article>
  )
}

export default MovieCard