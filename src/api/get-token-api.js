import { BASE_URL } from './base-url'

const getToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/token`)
    const data = await response.json()
    if (data.success) {
      return {
        success: true,
        token: data.token
      }
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export default getToken
