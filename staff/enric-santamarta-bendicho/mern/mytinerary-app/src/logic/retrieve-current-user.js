import axios from 'axios';

export default async function () {

  return (async () => {
    try {
      const res = await axios.get('http://localhost:5000/users', {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      })

      const user = res.data

      return user
    } catch (error) {
      const { response: { status } } = error

      switch (true) {
        case status === 401:
          throw new Error('wrong credentials')
        case status < 500:
          throw new Error('client error')
        case status >= 500:
          throw new Error('server error')
      }
    }
  })()
}


