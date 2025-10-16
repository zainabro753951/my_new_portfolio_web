import React from 'react'
import { Route, Routes } from 'react-router-dom'
import allRoutes from './Routes/routes'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {allRoutes.map((route, idx) => {
          return <Route path={route.path} element={route.element} />
        })}
      </Routes>
    </>
  )
}

export default App
