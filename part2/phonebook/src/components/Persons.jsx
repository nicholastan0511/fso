const Persons = ({ toShow, delPerson }) => {
    return (
      <div>
        <ul>
          {toShow.map(person => 
            <Person key={person.id} person={person} deletePerson={delPerson}/>  
          )}
        </ul>
      </div>
    ) 
  }
  
const Person = ({ person, deletePerson }) => {
    return (
      <li>
        {person.name} {person.number} 
        <button onClick={() => deletePerson(person.name, person.id)}>delete</button>
      </li> 
    )
}

export default Persons