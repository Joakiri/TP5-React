function Loader({ message = 'Cargando...' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="loader__spinner" aria-hidden="true" />
      <p className="loader__text">{message}</p>
    </div>
  )
}
 
export default Loader