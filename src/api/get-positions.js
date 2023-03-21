import { BASE_URL } from './base-url'

const fetchPositions = async () => {
  try {
    const response = await fetch(`${BASE_URL}/positions`)
    const data = await response.json()
    if (data.success) {
      return {
        success: true,
        positions: data.positions
      }
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export default fetchPositions
