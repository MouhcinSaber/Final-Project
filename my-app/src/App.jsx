import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Chats from './components/sarra/Chats'
import Conversation from './components/Saber/Conversation'
import Profil from './components/sarra/Profil'
import Otherprofiles from './components/sarra/Otherprofiles'

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
          <li>
            <Link to="/profil/691b2b1ea5247d0085dc114f" > other profil</Link>
          </li>
        </ul>

        <Routes>
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
