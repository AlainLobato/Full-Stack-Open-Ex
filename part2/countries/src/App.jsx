import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import Filter from './components/Filter'

const Form = ({ country, setCountry }) => {
  const handleCountry = (event) => {
    event.preventDefault()
    setCountry(event.target.value)
  }

  return (
    <form>
      <label>Country: </label>
      <input value={country} onChange={handleCountry} />
    </form>
  )
}

function App() {
  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (country) {
      const request = axios.get(
        'https://studies.cs.helsinki.fi/restcountries/api/all'
      )
      request.then((response) => {
        const filterCountries = response.data.filter((place) => {
          return place.name.common.startsWith(country)
        })
        setCountries(filterCountries)
      })
    }
  }, [country])

  return (
    <div>
      <Form country={country} setCountry={setCountry} />
      <Filter countries={countries} />
    </div>
  )
}

export default App
