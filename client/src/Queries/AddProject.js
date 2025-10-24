import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const submitProjectRes = async data => {
  console.log(data)

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const response = await axios.post(`${backendUrl}/project/add`, data, {
    withCredentials: true,
  })
  return response.data
}

export const mutateProject = () => {
  let queryClient = useQueryClient()
  return useMutation({
    mutationFn: submitProjectRes,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['projects'] })
    },
  })
}
