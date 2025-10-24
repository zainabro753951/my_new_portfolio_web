import axios from 'axios'
import { queryClient } from '../queryClient.js'

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true, // important for cookie auth
})

// Response interceptor: if 401, invalidate / refetch secureRoute
api.interceptors.response.use(
  res => res,
  error => {
    const status = error?.response?.status

    if (status === 401) {
      // Option A: invalidate — causes active queries with that key to refetch
      queryClient.invalidateQueries(['secureRoute'])

      // Option B: force refetch immediately
      // queryClient.refetchQueries({ queryKey: ['secureRoute'], active: true })

      // Optional: you can also invalidate other auth-dependent queries
      // queryClient.invalidateQueries('user')
    }

    return Promise.reject(error)
  }
)

export default api
