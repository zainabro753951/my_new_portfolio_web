import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL

// ✅ API call function (pure async function)
const superAdminLoginRequest = async loginData => {
  const response = await axios.post(`${backendUrl}/super-admin/login`, loginData, {
    withCredentials: true,
  })
  return response.data
}

// ✅ Custom Hook using React Query
export const useSuperAdminLogin = () => {
  return useMutation({
    mutationFn: superAdminLoginRequest,
  })
}
