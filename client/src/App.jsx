import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ScrollToTop from './components/ScrollToTop'
import allRoutes from './Routes/routes'
import { adminRoutes } from './Routes/admin.route'
import DHomePage from './pages/admin/Layout/DHomePage'
import ProtectedRoute from './context/ProtectedRoute'
import Login from './pages/admin/Login'

const App = () => {
  const { isAuth } = useSelector(state => state.adminAuth)

  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* 🌍 Public (non-admin) routes */}
        {allRoutes.map(({ path, element }, idx) => (
          <Route key={idx} path={path} element={element} />
        ))}

        {/* 🔑 Admin Login route (public) */}
        <Route
          path="/admin/login"
          element={isAuth ? <Navigate to="/admin" replace /> : <Login />}
        />

        {/* 🔒 Admin Protected Area */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <DHomePage />
            </ProtectedRoute>
          }
        >
          {adminRoutes.map(({ path, elem }, idx) => (
            <Route key={idx} path={path} element={elem} />
          ))}
        </Route>

        {/* 🚀 Fallback route */}
        <Route path="*" element={<Navigate to={isAuth ? '/admin' : '/admin/login'} replace />} />
      </Routes>
    </>
  )
}

export default App
