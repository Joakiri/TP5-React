import { useState } from 'react'
 
function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('')
 
  const handleSubmit = (e) => {
    e.preventDefault()
 
    const trimmed = inputValue.trim()
    if (!trimmed) return
 
    onSearch(trimmed)
  }
 
  
  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Buscar película o serie..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        aria-label="Buscar título"
      />
      <button type="submit" className="search-bar__button">
        Buscar
      </button>
    </form>
  )
}
 
export default SearchBar
 