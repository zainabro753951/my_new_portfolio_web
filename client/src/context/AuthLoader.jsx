import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../Queries/SecureRoute'
import { loginAdmin, logoutAdmin } from '../features/authSlice'

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch()
  const { data, isError, isSuccess, isLoading, isFetching } = checkAuth()

  const isVerifying = isLoading || isFetching

  useEffect(() => {
    if (isError) {
      dispatch(logoutAdmin())
    } else if (isSuccess && data?.admin) {
      dispatch(loginAdmin({ isAuth: true, ...data.admin }))
    }
  }, [isError, isSuccess, data, dispatch])

  // 🚫 Don't render routes until verification is done
  if (isVerifying) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-xl font-semibold animate-pulse">Verifying session...</h1>
      </div>
    )
  }

  return children
}

export default AuthLoader
