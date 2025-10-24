import { useQuery } from '@tanstack/react-query'
import api from '../api/axios'

const superAdminCheckAuth = async () => {
  const response = await api.get(`/super-admin/auth`, {
    withCredentials: true,
  })
  return response.data
}

export const checkAuth = () => {
  return useQuery({
    queryKey: ['secureRoute'],
    queryFn: superAdminCheckAuth,
    enabled: true,
    refetchOnWindowFocus: false,
    retry: 2,
  })
}
