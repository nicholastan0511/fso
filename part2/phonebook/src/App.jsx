import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Notification from './components/Notification'
import personTool from './services/persons.js'

const App = () => {

  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '0931267843', id: 1},
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 

  useEffect(() => {
      personTool 
        .getAll()
        .then(returnedPersons => setPersons(returnedPersons))
  }, [])
  
  const [newName, setNewName] = useState('Bob')
  const [newNum, setNewNum] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMes] = useState(null) 

  const addNewPerson = (event) => {
    event.preventDefault()
    //if name already exists
    if (checkRegis()) 
      return
    else {
      const newPerson = {
        name: newName,
        number: newNum,
      }

      personTool
        .addContact(newPerson)
        .then(returnedRes => {
          setPersons(persons.concat(returnedRes))
          setNewName('')
          setNewNum('')
          setMes(`Added ${newName}`)
          setTimeout(() => {
            setMes(null)
          }, 5000)
        })
    }
  }

  const deletePerson = (name, id) => {
    personTool
      .delContact(id)
      .then(res => {
          if (window.confirm(`Do you want to delete ${name}?`)) {
            setPersons(persons.filter(p => p.id !== id))
            setMes(`deleted ${name} from the phonebook`)
          }
        }
      )
  }

  const changeFilter = (event) => setFilter(event.target.value)

  const dynamicRegex = new RegExp(filter, 'i')

  const toShow = filter.length > 0 
  ? persons.filter(person => dynamicRegex.test(person.name))
  : persons

  const trackNewName = (event) => setNewName(event.target.value)

  const trackNewNum = (event) => setNewNum(event.target.value)

  const registered = (arr, val, prop) => arr.some(i => i[prop] === val)
  const checkRegis = () => {
    if (registered(persons, newName, 'name') && newNum !== '') {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        alterInfo()
        setNewName('')
        setNewNum('')
        return true
      }
        
    } else if (registered(persons, newNum, 'number')) {
      alert('Number is already registered')
      setNewNum('')
      return true
    } else if (newName === '' || newNum === '' || !Number(newNum)) {
        alert('Please input a valid name and phone number!')
        return true
    }
    else
      return false
  } 

  
const alterInfo = () => {
 
  const person = persons.find(p => p.name == newName)
  const changedPerson = { ...person, number: newNum }

  const personId = person.id

  console.log(person, person.id)

  personTool
    .update(personId, changedPerson)
    .then(res => {
      setPersons(persons.map(person => person.id !== personId ? person : res))
    })
    .catch(error => {
      setMes(`Information of ${newName} has already been removed from the server. Please re-add the person!`)
      setTimeOut(() => setMes(null), 5000)
      setPersons(persons.filter(p => p.name !== newName))
    })
}


  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message}/>

      <Filter changeFilter={changeFilter} filter={filter}/>

      <h3>Add a new</h3>

      <PersonForm trackNewName={trackNewName} trackNewNum={trackNewNum} 
      newName={newName} newNum={newNum} addNewPerson={addNewPerson} /> 
      
      <h3>Numbers</h3>

      <Persons toShow={toShow} delPerson={deletePerson}/>

    </div>
  )
}

export default App