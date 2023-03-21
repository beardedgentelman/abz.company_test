import { BASE_URL } from './base-url'

const fetchUsers = async page => {
  const QUERIES = `?page=${page}&count=6`
  try {
    const response = await fetch(`${BASE_URL}/users${QUERIES}`)
    const data = await response.json()
    if (data.success) {
      return {
        success: true,
        users: data.users,
        nextPageLink: data.links.next_url,
        prevPageLink: data.links.prev_url
      }
    } else {
      throw new Error(data.message)
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

export default fetchUsers
