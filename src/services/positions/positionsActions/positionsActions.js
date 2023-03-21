import { fetchPositions } from 'api'

const {
  FETCH_POSITIONS_FAILURE,
  FETCH_POSITIONS_SUCCESS,
  FETCH_POSITIONS_REQUEST
} = require('../positionsTypes/positionTypes')

const fetchPositionsRequest = () => async dispatch => {
  dispatch({ type: FETCH_POSITIONS_REQUEST })
  try {
    const data = await fetchPositions()
    if (data.success) {
      dispatch({
        type: FETCH_POSITIONS_SUCCESS,
        payload: data.positions
      })
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    dispatch({ type: FETCH_POSITIONS_FAILURE, payload: error.message })
  }
}

export default fetchPositionsRequest
