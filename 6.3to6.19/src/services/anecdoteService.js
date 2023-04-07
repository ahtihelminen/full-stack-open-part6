import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'


const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdoteToCreate = asObject(content)
  const response = await axios.post(baseURL, anecdoteToCreate)
  return response.data
}

const voteAnecdote = async (id) => {
  console.log(id)
  const anecdoteToUpdate = await axios.get(`${baseURL}/${id}`)
  console.log(anecdoteToUpdate)
  const updatedAnecdote = {
    ...anecdoteToUpdate.data,
    votes: anecdoteToUpdate.data.votes + 1 
  }
  const response = await axios.put(`${baseURL}/${id}`, updatedAnecdote)
  console.log(response)
  return response.data
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createAnecdote, voteAnecdote }