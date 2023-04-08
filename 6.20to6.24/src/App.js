import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { getAll, updateAnecdote } from './requests'

import { useContext } from 'react'
import NotificationContext from './notificationContext'

const App = () => {

  const queryClient = useQueryClient()

  const [notification, dispatch] = useContext(NotificationContext)

  const setNotification = message => {
    dispatch({ type: 'SET_MESSAGE', payload: message})
    dispatch({ type: 'SET_VISIBILITY', payload: 'visible' })
    setTimeout(() => {
      dispatch({ type: 'SET_VISIBILITY', payload: 'hidden' })
      dispatch({ type: 'SET_MESSAGE', payload: ''})
      queryClient.invalidateQueries('anecdotes')
    }, 5000)
  }



  const updateAnecdoteMutation = useMutation(
    updateAnecdote, 
    {
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries('anecdotes')
        }, 100)
      }
    }
  )



  const result = useQuery('anecdotes', getAll, {
    refetchOnWindowFocus: false,
    retry: 1
  })
  
  if (result.isLoading){
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }


  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    setNotification(
      `You voted anecdote: ${anecdote.content}`
    )
  }


  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />      
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
