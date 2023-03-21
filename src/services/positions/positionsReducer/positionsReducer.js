import {
  FETCH_POSITIONS_FAILURE,
  FETCH_POSITIONS_REQUEST,
  FETCH_POSITIONS_SUCCESS
} from '../positionsTypes/positionTypes'

const initialState = {
  loading: false,
  success: false,
  error: null,
  positions: []
}

const positionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSITIONS_REQUEST:
      return { ...state, loading: true }
    case FETCH_POSITIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        positions: action.payload
      }
    case FETCH_POSITIONS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default positionsReducer
