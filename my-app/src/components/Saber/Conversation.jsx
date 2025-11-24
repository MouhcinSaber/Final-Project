import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE } from '../../settings';
import './Conversation.css';

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const [input, setInput] = useState("");
  const conversationId = id;
  const sender_id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : "6912961b5c06c48e6269e276";

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
    const sender_id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : "6912961b5c06c48e6269e276";
    console.log(sender_id); 
    try {
      const res = await fetch(`${API_BASE}/api/chats/${conversationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({sender_id, type:"Txt", content: text }),
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
    <div className="conversation-root">
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
              <div 
            key={msg._id} 
            className={`message-item ${msg.sender_id === sender_id ? 'my-message' : 'other-message'}`}
          >
            <p><strong>{msg.senderName}:</strong> {msg.content}</p>
            <span className="timestamp">{msg.time_sent}</span>
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