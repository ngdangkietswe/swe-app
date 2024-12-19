import axios from 'axios'
import { ACCESS_TOKEN, API_BASE_URL, TOKEN_PREFIX } from '../constants'

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
      config.headers.Authorization = `${TOKEN_PREFIX} ${token}`
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    // Do something with response data
    console.log('Response: ', response)
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance