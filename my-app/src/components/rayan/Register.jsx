import React, { useState } from 'react';
import { API_BASE } from '../../settings';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [gender, setGender] = useState('');
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');


  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_BASE}/api/authentification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Password: password,
          email,
          Username: username,
          Field_of_study: fieldOfStudy,
          University_name: universityName,
          Gender: gender,
          Conversations: conversations
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      setSuccess('Registration successful!');

      // Save token to stay logged in
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }

      // Redirect to chats page
      window.location.href = '/login';
    } catch (err) {
      setError('Server error, try again later.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username</label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label>Field of Study</label>
          <input type="text" value={fieldOfStudy} onChange={(e) => setFieldOfStudy(e.target.value)} />
        </div>
        <div>
          <label>University Name</label>
          <input type="text" value={universityName} onChange={(e) => setUniversityName(e.target.value)} />
        </div>
        <div>
          <label>Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <label>Fields of Study</label>
          <select
            value={fieldOfStudy}
            onChange={(e) => setFieldOfStudy(e.target.value)}
          >
            <option value="">Select Field of Study</option>
            <option value="Info">Info</option>
            <option value="Medicine">Medicine</option>
          </select>

        </div>
        <div>
          <label>Conversations (JSON array)</label>
          <input type="text" value={JSON.stringify(conversations)} onChange={(e) => setConversations(JSON.parse(e.target.value))} />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}