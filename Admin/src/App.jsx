import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { NRoutes } from './Routes/NRoutes.jsx'

const App = () => {
  return (
    <>
      <Routes>
        {NRoutes.map((item, idx) => {
          return <Route path={item.path} key={idx} element={item.elem} />
        })}
      </Routes>
    </>
  )
}

export default App
