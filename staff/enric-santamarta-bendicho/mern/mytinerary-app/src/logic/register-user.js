import { validateEmail } from '../utils'

export default async function registerUser(name, email, password, foto) { // register-user
  if (typeof email !== 'string') throw new TypeError(`${email} is not a string`)
  if (!validateEmail(email)) throw new Error(`${email} is not an e-mail`)
  if (typeof password !== 'string') throw new TypeError(`${password} is not a string`)
  const user = { name, email, password, foto };
  let formBody = [];

  for (const property in user) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(user[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }

  formBody = formBody.join('&');

  const createUser = await fetch('http://localhost:5000/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: formBody
  })
}