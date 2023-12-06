import axios from 'axios'
import { useEffect } from 'react'

const api_key = import.meta.env.VITE_SOME_KEY
console.log(api_key)

const Country = ({ country, handleShow }) => {

  if (country.length == 1) {
    return (
      <div>
        <CountryInfo country={country[0]} />
      </div>
    )
  } 

  return (
    <div>
        {country.map((c, i) => {
            if (i > 10)
                return
            return (
            <div key={c.cca2}>
                {c.name.common}
                <button onClick={() => handleShow(c.name.common)}>show</button> 
            </div>
            )
          })
        }
    </div>
  )
} 

const CountryInfo = ({ country }) => {

    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]}&limit=1&appid=${api_key}`

    let lon;
    let lat;

    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`

    useEffect(() => {
        axios
            .get(geoUrl)
            .then(res => {
                console.log(res.data, res.data[0].lon)
                lon = res.data[0].lon
                lat = res.data[0].lat
            })
    })

    // useEffect(() => {
    //     if (lat && lon) {
    //         axios
    //             .get(weatherUrl)
    //             .then
    //     }
    // }, [lat, lon])
   

    const language = []

    for (let key in country.languages) {
        language.push(
        <li key={key}>{country.languages[key]}</li>
        )
    } 

    return (
        <div>
        <h1>{country.name.common}</h1>
        <p>capital {country.capital[0]}</p>
        <p>area {country.area}</p>

        <h3>languages:</h3>
        <ul>
            {language}
        </ul>
        <div>
            <img src={country.flags.png}/>
        </div>
        </div>

    )
}

export { Country, CountryInfo }


