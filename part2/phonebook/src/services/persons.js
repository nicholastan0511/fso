import axios from 'axios'

const baseURL = '/api/persons'

const addContact = (newPerson) => {
  return(
    axios
    .post(baseURL, newPerson)
    .then(response => response.data)
  )
}

const getAll = () => {
  return (
    axios
    .get(baseURL)
    .then(res => res.data)
  )
}

const delContact = (id) => {
  return (
    axios
      .delete(`${baseURL}/${id}`)
      .then(res => res.data)
  )
}

const update = (id, newObj) => {
  return (
    axios
      .put(`${baseURL}/${id}`, newObj)
      .then(res => res.data)
  )
}

export default { addContact, getAll, delContact, update }