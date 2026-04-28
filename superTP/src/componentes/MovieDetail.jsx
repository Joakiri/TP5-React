const POSTER_FALLBACK = 'https://placehold.co/200x295?text=Sin+póster'
 
const formatField = (value) => (!value || value === 'N/A' ? '—' : value)
 
function DetailRow({ label, value }) {
  const formatted = formatField(value)
  if (formatted === '—') return null
 
  return (
    <div className="movie-detail__row">
      <span className="movie-detail__label">{label}</span>
      <span className="movie-detail__value">{formatted}</span>
    </div>
  )
}
 
function MovieDetail({ movie, onBack }) {
  const {
    Title,
    Poster,
    Year,
    Genre,
    Director,
    Actors,
    Plot,
    Runtime,
    Language,
    Country,
    imdbRating,
  } = movie
 
  const posterSrc = Poster !== 'N/A' ? Poster : POSTER_FALLBACK
 
  return (
    <section className="movie-detail">
      <button className="movie-detail__back" onClick={onBack}>
         Volver
      </button>
 
      <div className="movie-detail__header">
        <img className="movie-detail__poster" src={posterSrc} alt={`Póster de ${Title}`}/>
        <div className="movie-detail__main">
          <h2 className="movie-detail__title">{formatField(Title)}</h2>
 
          {imdbRating !== 'N/A' && (
            <p className="movie-detail__rating">★ {imdbRating} / 10</p>
          )}
 
          <p className="movie-detail__plot">{formatField(Plot)}</p>
        </div>
      </div>
 
      <div className="movie-detail__meta">
        <DetailRow label="Año"       value={Year}      />
        <DetailRow label="Género"    value={Genre}     />
        <DetailRow label="Director"  value={Director}  />
        <DetailRow label="Actores"   value={Actors}    />
        <DetailRow label="Duración"  value={Runtime}   />
        <DetailRow label="Idioma"    value={Language}  />
        <DetailRow label="País"      value={Country}   />
      </div>
    </section>
  )
}
 
export default MovieDetail
