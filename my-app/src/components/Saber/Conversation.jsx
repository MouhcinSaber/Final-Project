import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE } from '../../settings';
import './Conversation.css';

export default function Conversation() {
  const { id: conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [partner, setPartner] = useState(null);
  const [conversation, setConversation] = useState(null);

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const sender_id = user?._id || "6912961b5c06c48e6269a256";
  const token = localStorage.getItem("token");

  // Fetch messages
  useEffect(() => {
    const controller = new AbortController();

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/chats/${conversationId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Failed to fetch messages: ${res.status}`);
        const data = await res.json();
        setMessages(Array.isArray(data) ? data : []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    return () => controller.abort();
  }, [conversationId, token]);

  // Fetch conversation for partner info
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/conversations/${conversationId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (!res.ok) return;
        const data = await res.json();
        setConversation(data);
      } catch (err) {
        console.warn("Failed to fetch conversation:", err);
      }
    };
    fetchConversation();
  }, [conversationId, token]);

  // Set chat partner
  useEffect(() => {
    if (conversation?.users) {
      setPartner(conversation.users.find(u => u !== sender_id));
    }
  }, [conversation, sender_id]);

  // Send new message
  const sendMessage = async (text) => {
    try {
      const res = await fetch(`${API_BASE}/api/chats/${conversationId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ sender_id, content: text, type: "Txt" }),
      });

      if (!res.ok) throw new Error(`Failed: ${res.status}`);
      const saved = await res.json();
      setMessages(prev => [...prev, saved]);
    } catch (err) {
      console.error(err);
      alert("Failed to send message.");
    }
  };

  // Delete message
  const handleDelete = async (msgId) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/chats/${msgId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      setMessages(prev => prev.filter(m => m._id !== msgId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete the message.");
    }
  };

  // Start editing a message
  const handleEdit = (msg) => {
    setEditingMessageId(msg._id);
    setEditContent(msg.content);
  };

  // Save edited message
  const saveEdit = async (msgId) => {
    try {
      const res = await fetch(`${API_BASE}/api/chats/${msgId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (!res.ok) throw new Error(`Update failed: ${res.status}`);
      const updatedMsg = await res.json();
      setMessages(prev => prev.map(m => (m._id === msgId ? updatedMsg : m)));
      setEditingMessageId(null);
      setEditContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to update message.");
    }
  };

  // Send new message on form submit
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  const [input, setInput] = useState("");

  return (
    <div className="conversation-root">
      <div className="Nav-bar">
        {/* Header */}
        {partner && (
          <Link to={`/profil/${partner}`} className="conversation-header">
            <img
              src={partner.Profile_picture || "/default-avatar.png"}
              alt={partner.Username || "Unknown"}
              className="partner-avatar"
            />
            <h2>{partner.Username || "Unknown"}</h2>
          </Link>
        )}

        {/* Search */}
        <input
          type="text"
          placeholder="Search messages..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        {/* Messages */}
        <div className="messages-list">
          {loading && <p>Loading messages...</p>}
          {error && <p className="error">{error}</p>}
          {!loading &&
            !error &&
            messages
              .filter(msg => msg.content.toLowerCase().includes(query.trim().toLowerCase()))
              .map(msg => {
                const isMine = (msg.sender_id?._id || msg.sender_id) === sender_id;
                return (
                  <div key={msg._id} className={`message-item ${isMine ? "my-message" : "other-message"}`}>
                    {editingMessageId === msg._id ? (
                      <>
                        <input
                          value={editContent}
                          onChange={e => setEditContent(e.target.value)}
                          style={{ width: "80%" }}
                        />
                        <button onClick={() => saveEdit(msg._id)}>Save</button>
                        <button onClick={() => setEditingMessageId(null)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>{isMine ? "You" : msg.sender_id?.Username || "Unknown"}:</strong> {msg.content}
                        </p>
                        <span className="timestamp">{msg.time_sent}</span>
                        {isMine && (
                          <div className="message-actions">
                            <button onClick={() => handleEdit(msg)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDelete(msg._id)} className="delete-btn">Delete</button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
        </div>

        {/* Input for new messages */}
        <form onSubmit={handleSend} className="message-form">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
