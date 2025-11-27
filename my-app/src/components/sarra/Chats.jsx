import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../../settings";
import './Chats.css';

function Chats() {
  const navigate = useNavigate();

  // Get token and user from storage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  const [user, setUser] = useState(token && storedUser ? JSON.parse(storedUser) : null);

  const [conversations, setConversations] = useState([]);
  const [usersMap, setUsersMap] = useState({});
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(""); // For temporary messages

  // Fetch conversations and users map if logged in
  useEffect(() => {
    if (!user || !token) return;

    const controller = new AbortController();
    const fetchData = async () => {
      try {
        // Fetch conversations
        const res = await fetch(`${API_BASE}/api/conversations/user/${user._id}`, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Failed to fetch conversations: ${res.status}`);
        const convs = await res.json();
        setConversations(convs);

        // Fetch all users
        const usersRes = await fetch(`${API_BASE}/api/authentification`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!usersRes.ok) throw new Error(`Failed to fetch users: ${usersRes.status}`);
        const users = await usersRes.json();
        const map = {};
        if (Array.isArray(users)) users.forEach(u => { if (u?._id) map[u._id] = u; });
        setUsersMap(map);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Unknown error");
      }
    };

    fetchData();
    return () => controller.abort();
  }, [user, token]);

  // Search users
  useEffect(() => {
    if (!query || query.trim().length < 2 || !token) {
      setSearchResults([]);
      setSelectedUser(null);
      return;
    }

    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/authentification`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        if (!res.ok) return setSearchResults([]);
        const users = await res.json();
        const q = query.trim().toLowerCase();
        const matches = Array.isArray(users)
          ? users.filter(u => (u.Username || "").toLowerCase().includes(q))
          : [];
        setSearchResults(matches);
      } catch (e) {
        if (e.name !== "AbortError") setSearchResults([]);
      }
    }

    fetchUsers();
    return () => controller.abort();
  }, [query, token]);

  // Filter conversations for search query
  const filteredConversations = useMemo(() => {
    if (!user) return [];
    return conversations.filter(c => {
      const themeName = c?.Theme_id?.Name || c?.Theme_id?.name || "";
      const msgs = Array.isArray(c.Messages) ? c.Messages : [];
      const last = msgs.length ? msgs[msgs.length - 1].content : "";

      const usersArr = c.users || c.Users || [];
      let partner = null;

      if (Array.isArray(usersArr) && usersArr.length) {
        const entry = usersArr.find(u => {
          const uid = u?._id ? String(u._id) : String(u);
          return uid !== String(user._id);
        });
        partner = entry?._id ? entry : usersMap[String(entry)];
      }

      const partnerName = partner?.Username || "";
      const searchable = `${themeName} ${last} ${partnerName}`.toLowerCase();
      return searchable.includes(query.trim().toLowerCase());
    });
  }, [conversations, query, usersMap, user]);

  // Create or navigate to conversation
  const handleNewChat = async () => {
    if (!selectedUser) {
      setToast("Select a user from search first");
      return;
    }

    // Normalize user IDs in existing conversations
    const existing = conversations.find(conv => {
      const usersArr = conv.users || conv.Users || [];
      const ids = usersArr.map(u => (u?._id ? String(u._id) : String(u)));
      return ids.includes(String(user._id)) && ids.includes(String(selectedUser._id)) && !conv.field ;
    });

    if (existing) {
      setToast("Conversation already exists!");
      navigate(`/chats/${existing._id}`);
      setSelectedUser(null);
      setQuery("");
      return;
    }

    // No conversation exists → create a new one
    try {
      const body = {
        Messages: [],
        Seen_messages_id: null,
        Theme_id: selectedUser._id,
        users: [user._id, selectedUser._id],
      };

      const res = await fetch(`${API_BASE}/api/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to create conversation");

      const created = await res.json();
      setConversations(prev => [created, ...prev]);
      navigate(`/chats/${created._id}`);
      setSelectedUser(null);
      setQuery("");
      setToast("New conversation created!");
    } catch (err) {
      console.error(err);
      setToast("Could not create conversation");
    }
  };

  // Helper function for formatting time
  const formatTime = (time) => {
    if (!time) return "";
    const d = new Date(time);
    return d.toLocaleString();
  }

  return (
    <div className="chats-container">
      <header className="chats-header">
        <h2>Chats</h2>
      </header>

      {/* Toast message */}
      {toast && <div className="toast">{toast}</div>}

      <div className="chats-search-container">
        <div className="chats-search">
          <input
            type="search"
            placeholder="Search users..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {searchResults.length > 0 && (!selectedUser || selectedUser.Username !== query) && (
            <ul className="search-results">
              {searchResults.map(u => (
                <li
                  key={u._id}
                  className={`search-item ${selectedUser && selectedUser._id === u._id ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedUser(u);
                    setQuery(u.Username);
                  }}
                >
                  <img src={u.Profile_picture || "/avatars/default.png"} alt={u.Username} />
                  <span>{u.Username}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          className="new-chat"
          onClick={handleNewChat}
          disabled={!selectedUser}
        >
          New
        </button>
      </div>

      {error && <div style={{ padding: 12, color: "#a00" }}>Error: {error}</div>}

      <ul className="chats-list">
        {filteredConversations.map((c, idx) => {
          const msgs = Array.isArray(c.Messages) ? c.Messages : [];
          const lastMsg = msgs.length ? msgs[msgs.length - 1] : null;
          const lastContent = lastMsg ? lastMsg.content : "No messages yet";
          const lastTime = lastMsg
            ? formatTime(lastMsg.time_sent || lastMsg.createdAt || c.updatedAt || c.createdAt)
            : formatTime(c.updatedAt || c.createdAt);
          const unread = msgs.filter(m => m.status === "Not Seen").length;

          const usersArr = c.users || c.Users || [];
          let partner = null;
          if (Array.isArray(usersArr) && usersArr.length) {
            const entry = usersArr.find(u => {
              const uid = u?._id ? String(u._id) : String(u);
              return uid !== String(user._id);
            });
            partner = entry?._id ? entry : usersMap[String(entry)];
          }

          const nameResolved = c?.field || partner?.Username || (c?.Theme_id?.Name || c?.Theme_id?.name) || `Conversation ${idx + 1}`;
          const avatar = partner?.Profile_picture || c?.Theme_id?.avatar || c?.Profile_picture || "/avatars/default.png";

          return (
            <li key={c._id || idx} className="chat-item">
              <Link to={`/chats/${c._id || idx}`} className="chat-link">
                <div className="chat-meta">
                  <div className="chat-top">
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <img src={avatar} alt={nameResolved} style={{ width: 44, height: 44, borderRadius: 12, objectFit: "cover" }} />
                      <span className="chat-name">{nameResolved}</span>
                    </div>
                    <span className="chat-time">{lastTime}</span>
                  </div>
                  <div className="chat-bottom">
                    <span className="chat-last">{lastContent}</span>
                    {unread > 0 && <span className="chat-unread">{unread}</span>}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
        {filteredConversations.length === 0 && <li className="no-results">No chats found.</li>}
      </ul>
    </div>
  );
}

export default Chats;
