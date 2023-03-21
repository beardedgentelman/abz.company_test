import {
  ADD_USERS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  RESET_USERS
} from '../usersCardsTypes/usersCardsTypes'

const initialState = {
  users: [],
  nextPageLink: null,
  loading: false,
  error: null
}

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload.users,
        nextPageLink: action.payload.nextPageLink,
        error: null
      }
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case ADD_USERS:
      const newUsers = action.payload.users.filter(
        newUser => !state.users.some(existingUser => existingUser.id === newUser.id)
      )
      return {
        ...state,
        loading: false,
        users: [...state.users, ...newUsers],
        nextPageLink: action.payload.nextPageLink,
        error: null
      }
    case RESET_USERS:
      return initialState
    default:
      return state
  }
}

export default usersReducer
