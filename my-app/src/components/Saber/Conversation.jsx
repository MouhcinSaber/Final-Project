import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE } from '../../settings';
import { useSelector } from 'react-redux';

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const [input, setInput] = useState("");

  // const token = useSelector((state) => state.user.token);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const controller = new AbortController();


    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/chats`, {
          method: "GET",
          headers: token
            ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            : { "Content-Type": "application/json" },
          signal: controller.signal,
        });
        if (!res.ok) {
          const txt = await res.text();
          throw new Error(`Failed to fetch: ${res.status} ${txt}`);
        }
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();




    return () => {
      controller.abort();
    };
  }, [id]);
  const sendMessage = async (text) => {
    
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/api/chats`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to send: ${res.status} ${txt}`);
      }

      const saved = await res.json();
      // Add the new message to state
      setMessages((prev) => [...prev, saved]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput(""); // clear UI input
  };

  return (
    <div>
      <div className='Nav-bar'>
        <h2>Conversation ID: {id}</h2>
        <div>
          <input
            type="text"
            placeholder="Search messages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="messages-list">
          {loading && <p>Loading messages...</p>}
          {error && <p className="error">Error: {error}</p>}
          {!loading && !error && messages
            .filter((msg) =>
              msg.content.toLowerCase().includes(query.trim().toLowerCase()))
            .map((msg) => (
              <div key={msg._id} className="message-item">
                <p><strong>{msg.senderName}:</strong> {msg.content}</p>
                <span className="timestamp">{new Date(msg.timestamp).toLocaleString()}</span>
              </div>
            ))}
        </div>
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit">Send</button>
        </form>

        <div className="status-bar">
          <span>Status: Online</span>
        </div>
        <div className="chats-root">
        </div>
      </div >
    </div>
  );
}