import { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';

import Chats from './components/sarra/Chats';
import Conversation from './components/Saber/Conversation';
import Profil from './components/sarra/Profil';
import Otherprofiles from './components/sarra/Otherprofiles';
import  Heropage from './components/rayan/Hero_page';
import Login from './components/rayan/Login';
import Register from './components/rayan/Register';

function App() {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2 className="logo">ChatApp</h2>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/chats" className="nav-link">Chats</Link>
          <Link to="/profil" className="nav-link">Profil</Link>
          <Link to="/login" className="nav-link login-btn">Login</Link>
          <Link to="/register" className="nav-link register-btn">Register</Link>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Heropage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/chats/:id" element={<Conversation />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/profil/:id" element={<Otherprofiles />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
