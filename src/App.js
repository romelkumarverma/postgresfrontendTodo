import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//import TodoList from './TodoList'
//import Navbar from './Navbar'
import TodoList from './TodoList'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<TodoList />}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
