import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0931267843', id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])
  
  const [newName, setNewName] = useState('Bob')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    //if name already exists
    if (registered(persons, newName, 'name')) {
      alert(`${newName} is already registered`)
      setNewName('')
    } else if (registered(persons, newName, 'number')) {
      alert('Number is already registered')
      setNewNum('')
    } else if (newName === '' || newNum === '' || !Number(newNum))
        alert('Please input a valid name and phone number!')
    else {
      const newPerson = {
        name: newName,
        number: newNum,
        id: persons.length + 1
      }

      setPersons(persons.concat(newPerson))
      setNewName('')
    }
  }

  const changeFilter = (event) => setFilter(event.target.value)

  const regexPattern = filter
  const regexFlags = 'i'
  const dynamicRegex = new RegExp(regexPattern, regexFlags)

  const toShow = filter.length > 0 
  ? persons.filter(person => dynamicRegex.test(person.name))
  : persons

  const trackNewName = (event) => setNewName(event.target.value)

  const trackNewNum = (event) => setNewNum(event.target.value)

  const registered = (arr, val, prop) => arr.some(i => i[prop] === val)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter changeFilter={changeFilter} filter={filter}/>

      <h3>Add a new</h3>

      <PersonForm trackNewName={trackNewName} trackNewNum={trackNewNum} 
      newName={newName} newNum={newNum} addNewPerson={addNewPerson} /> 
      
      <h3>Numbers</h3>

      <Persons toShow={toShow}/>

    </div>
  )
}

export default App