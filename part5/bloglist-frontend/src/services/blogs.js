import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObj) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const like = async (newObj) => {
  const config = {
    headers: { authorization: token }
  }

  const response = await axios.put(`${baseUrl}/${newObj.id}`, newObj, config)
  return response.data
}

const remove = async (newObj) => {
  const config = {
    headers: { authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${newObj.id}`, config)
  return response.data
}

const getUser = async (id) => {
  const response = await axios.get(`/api/users/${id}`)

  return response.data
}

export default { getAll, setToken, create, like, remove, getUser }