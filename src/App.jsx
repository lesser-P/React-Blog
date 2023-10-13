import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header_c from './components/Header'
import Home from './pages/Home'
import Project from './pages/Project'
import Note from './pages/Note'
import Write from './pages/Write'
import SideBar from './components/SideBar'
import { Col, Layout, Row, Space } from 'antd'
const { Header, Footer, Sider, Content } = Layout

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Header_c></Header_c>
        <div className='context'>
          <Routes>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/project' element={<Project />}></Route>
            <Route path='/note' element={<Note />}></Route>
            <Route path='/write' element={<Write />}></Route>
            <Route path='*' element={<Home />}></Route>
          </Routes>
          <SideBar></SideBar>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
