import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../Queries/SecureRoute'
import { loginAdmin, logoutAdmin } from '../features/authSlice'

const AuthLoader = ({ children }) => {
  const dispatch = useDispatch()
  const { data, isError, isSuccess, isLoading } = checkAuth()

  useEffect(() => {
    if (isError) {
      dispatch(logoutAdmin())
    }

    if (isSuccess && data?.admin) {
      dispatch(loginAdmin({ isAuth: true, ...data.admin }))
    }
  }, [isError, isSuccess, data, dispatch])

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <h1 className="text-xl font-semibold animate-pulse">Verifying session...</h1>
      </div>
    )
  }

  // ✅ Just render children — don't redirect or replace route
  return children
}

export default AuthLoader
