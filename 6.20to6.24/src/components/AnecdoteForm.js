
import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import NotificationContext from '../notificationContext'





const AnecdoteForm = () => {
  
  const queryClient = useQueryClient()
  
  const newAnecdotemutation = useMutation(
    createAnecdote, 
    {
      onSuccess: (context) => {
        queryClient.invalidateQueries('anecdotes')
        setNotification(
          `Anecdote '${context.content}' created`
        )
      },
      onError: (error) => {
        queryClient.invalidateQueries('anecdotes')
        setNotification(error.response.data.error)
      }
    }
  )

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

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdotemutation.mutate({ 
      content: content, 
      id: Math.floor(Math.random()*10000), 
      votes: 0
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
