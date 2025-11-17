import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

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
          <Link to="/profil/123" > other profil</Link>
        </li>
      </ul>
   
                <Routes>
                    <Route path="/chats" element={<Chats/>} />
                    <Route path="/profil" element={<Profil/>} />
                    <Route path="/profil/:id" element={<OtherProfil/>} />
                    </Routes>
        </div>
    </>
  )
}

export default App
