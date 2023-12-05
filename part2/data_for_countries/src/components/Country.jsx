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


