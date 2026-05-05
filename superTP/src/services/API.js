import axios from 'axios'

const API_KEY = '4b247b5'
const BASE_URL = 'https://www.omdbapi.com'

export const searchMovies = (query, type = '') => {
  const params = `?apikey=${API_KEY}&s=${query}`
  const typeParam = type ? `&type=${type}` : ''
  return axios.get(`${BASE_URL}${params}${typeParam}`)
}

export const getMovieDetail = (id) => {
  return axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`)
}