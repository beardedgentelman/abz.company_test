import { fetchUsers } from 'api'

import {
  ADD_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  RESET_USERS
} from '../usersCardsTypes/usersCardsTypes'

const getUsers = page => async dispatch => {
  dispatch({ type: FETCH_USERS_REQUEST })
  try {
    const data = await fetchUsers(page)
    if (data.success) {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: {
          users: data.users,
          nextPageLink: data.nextPageLink,
          prevPageLink: data.prevPageLink
        }
      })
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.message })
  }
}

const addUsers = (page, users) => async dispatch => {
  dispatch({ type: FETCH_USERS_REQUEST })
  try {
    const data = await fetchUsers(page)
    if (data.success) {
      dispatch({
        type: ADD_USERS,
        payload: {
          users: users.concat(data.users),
          nextPageLink: data.nextPageLink
        }
      })
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    dispatch({ type: FETCH_USERS_FAILURE, payload: error.message })
  }
}

const resetUsers = () => ({
  type: RESET_USERS
})

export { addUsers, getUsers, resetUsers }
