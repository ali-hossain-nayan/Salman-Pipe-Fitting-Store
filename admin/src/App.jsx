import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  const baseURL = 'http://localhost:4000'
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add baseURL={baseURL} />} />
          <Route path='/list' element={<List baseURL={baseURL} />} />
          <Route path='/order' element={<Orders baseURL={baseURL} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App