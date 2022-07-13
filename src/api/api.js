import { BASE_URL } from '@/env'
import axios from 'axios'
import interceptors from './interceptor'

const Api =
  axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
      Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    // timeout: 5000 // request timeout
  })

interceptors.setup(Api)
// interceptors.checkToken(Api)

export default Api