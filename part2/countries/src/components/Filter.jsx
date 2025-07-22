import { useState } from 'react'
import axios from 'axios'

const Filter = ({ countries }) => {
  const api_key = import.meta.env.VITE_OPENW_API_KEY

  const [details, setDetails] = useState(<br/>)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [weather, setWeather] = useState({wind: {}})

  const showDetails = (country) => {
    if (selectedCountry === country.name.common) {
      setSelectedCountry(null)
    } else {
      setSelectedCountry(country.name.common)
    }

    setDetails(
      <div>
        <h3>{country.name.common}</h3>
        <p>{country.capital}</p>
        <p>{country.area}</p>
        <h3>Languages: </h3>
        {Object.values(country.languages).map((v, k) => (
          <p key={k}>{v}</p>
        ))}
        <img src={Object.values(country.flags)[0]} />
      </div>
    )
  }

  if (countries.length === 0) {
    return <p>No countries matches</p>
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return (
      <div>
        <br />
        {countries.map((c, key) => (
          <div key={key}>
            <span>{c.name.common}</span>
            <button onClick={() => showDetails(c)}>Show</button>
            <br />
            <br />
            {selectedCountry === c.name.common ? details : null}
          </div>
        ))}
        
      </div>
    )
  }

  const capitalInfo = countries[0]['capitalInfo']['latlng']
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${capitalInfo[0]}&lon=${capitalInfo[1]}&appid=${api_key}`
  )
  
  request.then((response) => {
    const country_weather = response.data.weather[0]
    const wind = response.data.wind
    
    setWeather({ ...country_weather, wind })
  })

  return (
    <>
      <h3>{countries[0].name.common}</h3>
      <p>{countries[0].capital}</p>
      <p>{countries[0].area}</p>
      <h3>Languages: </h3>
      {Object.values(countries[0].languages).map((v, k) => (
        <p key={k}>{v}</p>
      ))}
      <img src={Object.values(countries[0].flags)[0]} />
      <br/>
      <br/>
      {weather.description}
      <br/>
      <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather icon" />
      <p>Temperature: {weather.wind.deg} degrees</p>
      <p>Wind speed: {weather.wind.speed} m/s</p>
    </>
  )
}

export default Filter
