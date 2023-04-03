
import AnecdoteForm from './components/AncdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'


const App = () => {
  return (
    <div>
      <Filter />
      <AnecdoteForm/>
      <AnecdoteList/>
    </div>
  )
}

export default App