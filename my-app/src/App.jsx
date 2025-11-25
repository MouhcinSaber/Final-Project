import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import HeroPage from './components/rayan/Hero_page'
import Login from './components/rayan/Login'
import Register from './components/rayan/Register'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HeroPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register " element={<Register/>} />
          {/*<Route path="/chats" element={<Chats />} />
          <Route path="/profil" element={<Profiler />} />
          <Route path="/profil/:id" element={<OtherProfil/>} />*/}
        </Routes>
      </div>
    </>
  )
}

export default App
