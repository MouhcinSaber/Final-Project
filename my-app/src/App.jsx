import { useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Chats from './components/sarra/Chats';
import Conversation from './components/Saber/Conversation';
import Profil from './components/sarra/Profil';
import Otherprofiles from './components/sarra/Otherprofiles';
import { ChatInput } from './components/rayan/Hero_page';
import Login from './components/rayan/Login';
import Register from './components/rayan/Register';

function App() {
  const navigate = useNavigate();

  // User state
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  const storedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
  const [user, setUser] = useState(storedUser && storedToken ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken || null);

  // Handle login
  const handleLogin = (userData, tokenData, remember = false) => {
    setUser(userData);
    setToken(tokenData);
    if (remember) {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", tokenData);
    } else {
      sessionStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("token", tokenData);
    }
    navigate("/chats");
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 className="logo">ChatApp</h2>
        <nav className="nav-links">
          {user ? (
            <>
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/chats" className="nav-link">Chats</Link>
              <Link to="/profil" className="nav-link">Profil</Link>
              <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={user ? <ChatInput /> : <Login onLogin={handleLogin} />} />
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Chats user={user} token={token} />} />
          <Route path="/register" element={!user ? <Register onLogin={handleLogin} /> : <Chats user={user} token={token} />} />
          <Route path="/chats" element={user ? <Chats user={user} token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="/chats/:id" element={user ? <Conversation user={user} token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="/profil" element={user ? <Profil user={user} token={token} /> : <Login onLogin={handleLogin} />} />
          <Route path="/profil/:id" element={user ? <Otherprofiles user={user} token={token} /> : <Login onLogin={handleLogin} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
