import { useState, useEffect } from "react"
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
}
  
export const useCountry = (name) => {
  const [country, setCountry] = useState({})
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

  useEffect(() => {
    console.log('im called')
    if (name === '')
      return
    const fetchData = async () => {
      try {
        const fetchedCountry = await axios.get(`${baseUrl}/${name}`)
        setCountry({
          name: fetchedCountry.data.name.common,
          capital: fetchedCountry.data.capital[0],
          pop: fetchedCountry.data.population,
          flag: fetchedCountry.data.flags.png,
          found: true
        })
        console.log(fetchedCountry)
      } catch (error) {
        setCountry(null)
      }
    }

    fetchData()
  }, [name])

  return country
}
