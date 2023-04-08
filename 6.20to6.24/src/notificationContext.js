import { createContext, useReducer } from 'react'


const initialState = {
  message: '',
  style: {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    visibility: 'hidden'
  }
}

const notificationReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'SET_MESSAGE':
      state.message = action.payload
      console.log(state.message)
      return state

    case 'SET_VISIBILITY':
      state.style = { ...state.style, visibility: action.payload }
      console.log(state.style)
      return state


    default:
      return state
  }
}


const NotificationContext = createContext()



export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}




export default NotificationContext