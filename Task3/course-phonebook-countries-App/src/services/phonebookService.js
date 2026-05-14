import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

export const getContacts = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createContact = async (contact) => {
  const response = await axios.post(baseUrl, contact)
  return response.data
}

export const updateContact = async (id, contact) => {
  const response = await axios.put(`${baseUrl}/${id}`, contact)
  return response.data
}

export const deleteContact = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}
