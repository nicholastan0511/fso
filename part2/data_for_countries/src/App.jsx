import { useState, useEffect } from 'react'
import axios from 'axios'
import { Country, CountryInfo } from './components/Country'

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])

  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

  useEffect(() => {

    axios
      .get(`${url}`)
      .then(res => {
        console.log(res.data)
        setCountries(res.data)
      })

  }, [])

  let dynamicRegex = new RegExp(filter, 'i')

  const toShow = filter.length > 0
  ? countries.filter(c => dynamicRegex.test(c.name.common)) : []

  const handleChange = (e) => {
    setFilter(e.target.value)
  }

  const handleShow = (name) => {  
    setFilter(`${name}`)
  }


  return (
    <div>
      find countries: <input value={filter} onChange={handleChange} />
      <div>
        <h3>Countries</h3>
        <Country country={toShow} handleShow={handleShow} />
      
      </div>
    </div>
  )
}

export default App
