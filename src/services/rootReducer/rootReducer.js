import { combineReducers } from '@reduxjs/toolkit'
import positionsReducer from 'services/positions/positionsReducer/positionsReducer'
import usersReducer from 'services/usersCards/usersCardsReducers/usersCardsReducer'

const appReducer = combineReducers({
  usersReducer: usersReducer,
  positionsReducer: positionsReducer
})

export const rootReducer = (state, action) => {
  if (action.type === 'CLEAR_STORE') {
    state = undefined
  }

  return appReducer(state, action)
}
