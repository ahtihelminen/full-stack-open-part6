import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </li>
  )
}


const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter !== '') {
      const filtered = state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
      return filtered
    }
    return state.anecdotes
  })
  const dispatch = useDispatch()

  const anecdotesToSort = [...anecdotes]

  const sortedAnecdotes = anecdotesToSort.sort((a1, a2) => a2.votes-a1.votes)
  
  return(
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {sortedAnecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleVote={() => {
              dispatch(voteAnecdote(anecdote.id))
              dispatch(setNotification(anecdote.content, 5))
            }}

          />
        )}
      </ul>
    </div>
  )
}

export default AnecdoteList