import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE } from '../../settings';
import './Conversation.css';

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const { id } = useParams();
  const [input, setInput] = useState("");
  const [partner, setPartner] = useState(null);
  const [conversation, setConversation] = useState(null);
  const conversationId = id;
  const sender_id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : "6912961b5c06c48e6269a256";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const controller = new AbortController();

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/chats/${conversationId}`, {
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

    // Fetch conversation 
    const fetchConversation = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/conversations/${conversationId}`, {
          method: "GET",
          headers: token
            ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
            : { "Content-Type": "application/json" },
          signal: controller.signal,
        });
        if (!res.ok) {
          console.warn(`Failed to fetch conversation: ${res.status}`);
          return;
        }
        const data = await res.json();
        console.log("Fetched Conversation Data:", data);
        setConversation(data);
      } catch (err) {
        if (err.name !== "AbortError") console.warn("Error fetching conversation:", err);
      }
    };

    fetchConversation();
    
    return () => controller.abort();
  }, [id, conversationId]);

  const sendMessage = async (text) => {
    const token = localStorage.getItem("token");
    const sender_id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : "6912961b5c06c48e6269a256";
    try {
      const res = await fetch(`${API_BASE}/api/chats/${conversationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` })
        },
        body: JSON.stringify({ sender_id, type: "Txt", content: text }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Failed to send: ${res.status} ${txt}`);
      }
      const saved = await res.json();
      setMessages((prev) => [...prev, saved]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  // Find the chat partner (first sender who is not the current user)
  useEffect(() => {
    console.log(conversation)
    console.log("Conversation users:", conversation?.users);
    setPartner(conversation?.users.find(msg => {
    return msg !== sender_id;
  }));

  }, [conversation, sender_id]);

  return (
    <div className="conversation-root">
      <div className='Nav-bar'>
        {/* Header: show partner */}
        {partner ? (
          <Link
            to={`/profil/${partner}`}
            className="conversation-header"
            style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit', marginBottom: '12px' }}
          >
            <img
              src={partner.Profile_picture}
              alt={partner.Username}
              className="partner-avatar"
              style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', marginRight: 12 }}
            />
            <h2 style={{ display: 'inline-block', verticalAlign: 'middle' }}>{partner.Username}</h2>
          </Link>
        ) : (
          <div className="conversation-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
            <img
              src={partner?.Profile_picture || '/default-avatar.png'}
              alt={partner?.Username || 'Unknown User'}
              className="partner-avatar"
              style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', marginRight: 12 }}
            />
            <h2 style={{ display: 'inline-block', verticalAlign: 'middle' }}>{partner?.Username}</h2>
          </div>
        )}

        {/* Search */}
        <div>
          <input
            type="text"
            placeholder="Search messages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Messages list */}
        <div className="messages-list">
          {loading && <p>Loading messages...</p>}
          {error && <p className="error">Error: {error}</p>}
          {!loading && !error && messages
            .filter((msg) => msg.content.toLowerCase().includes(query.trim().toLowerCase()))
            .map((msg) => {
              const sId = msg.sender_id?._id || msg.sender_id;
              const isMine = sId === sender_id;
              const displayName = msg.sender_id?.Username || (isMine ? 'You' : 'Unknown');
              return (
                <div key={msg._id} className={`message-item ${isMine ? 'my-message' : 'other-message'}`}>
                  <p><strong>{displayName}:</strong> {msg.content}</p>
                  <span className="timestamp">{msg.time_sent}</span>
                </div>
              );
            })}
        </div>

        {/* Input */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit">Send</button>
        </form>

        <div className="status-bar">
          <span>Status: Online</span>
        </div>
      </div>
    </div>
  );
}
