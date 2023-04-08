import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    "message": "init message",
    "style": {
      "border": "solid",
      "padding": 10,
      "borderWidth": 1,
      "visibility": "hidden"
    }
  },
  reducers: {
    setMessage(state, action) {
      state.message = `You voted '${action.payload}'`
    },
    showNotification(state, action) {
      state.style = {...state.style, visibility: 'visible'}
    },
    hideNotification(state, action) {
      state.style = {...state.style, visibility: 'hidden'}
    }
  }
})

export const { setMessage, showNotification, hideNotification } = notificationSlice.actions

export const setNotification = (anecdote, time) => {
  return dispatch => {
    dispatch(setMessage(anecdote))
    dispatch(showNotification())
    setTimeout(() => {
      dispatch(hideNotification())
    }, time*1000)
  }
}

export default notificationSlice.reducer