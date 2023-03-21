import { BASE_URL } from './base-url'

const postUser = async (values, getToken, setSuccess, setStatus) => {
  const formData = new FormData()

  formData.append('name', values.name)
  formData.append('email', values.email)
  formData.append('phone', values.phone)
  formData.append('position_id', values.position)
  formData.append('photo', values.photo)

  try {
    const token = await getToken
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'POST',
      body: formData,
      headers: {
        Token: token
      }
    })
    const data = await response.json()

    if (data.success) {
      setSuccess(true)
    } else {
      setSuccess(false)
    }
  } catch (error) {
    setSuccess(false)
    setStatus({ error: error.message })
  }
}

export default postUser
