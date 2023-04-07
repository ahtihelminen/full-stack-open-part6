import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      const filter = action.payload
      state = filter
      return state
    }
  },
})




/*const filterReducer = (state = '', action) => {
  //console.log('state before action', state)
  //console.log('action', action)

  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.filter
    default:
      return state
  }
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: {filter},
  }
}
*/

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer