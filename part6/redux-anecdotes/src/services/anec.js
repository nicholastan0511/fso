import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const newAnec = { content, votes: 0 } 
  const response = await axios.post(baseUrl, newAnec)
  return response.data
}

export default { getAll, createNew }