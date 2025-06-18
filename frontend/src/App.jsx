import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/blog/:id' element={<Blog/>} />
      </Routes>
    </div>
  )
}

export default App