import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Link, Route, Routes } from 'react-router-dom'
import Chats from './components/sarra/Chats'
import Conversation from './components/Saber/Conversation'
import Profil from './components/sarra/Profil'
import Otherprofiles from './components/sarra/Otherprofiles'
import HeroPage from './components/rayan/Hero_page'
import Login from './components/rayan/Login'
import Register from './components/rayan/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
       

        <ul>
          <li>
            <Link to="/chats" > Chats</Link>

          </li>
          <li>
            <Link to="/profil" > profil</Link>
          </li>
        
        </ul>

        <Routes>
          <Route path="/" element={<HeroPage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register " element={<Register/>} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:id" element={<Conversation />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/profil/:id" element={<Otherprofiles />} />
        </Routes>
      </div>
    </>
  )
}

export default App
