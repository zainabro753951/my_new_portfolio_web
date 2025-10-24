import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const addAboutFunc = async data => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const response = await axios.post(`${backendUrl}/about/add`, data, {
    withCredentials: true,
  })
  return response.data
}

export const useAddAbout = () => {
  let queryClient = useQueryClient()
  return useMutation({
    mutationFn: addAboutFunc,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
