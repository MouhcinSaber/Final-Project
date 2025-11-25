import { useState, useMemo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE } from "../../settings";
import './Chats.css';

function Chats() {
   const [conversations, setConversations] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [query, setQuery] = useState("");
   const [searchResults, setSearchResults] = useState([]);
   const [selectedUser, setSelectedUser] = useState(null);
   const navigate = useNavigate();
    // const token = useSelector(state => state.user.token);

  

   useEffect(() => {
      const controller = new AbortController();
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
      const userId = user?._id;
      console.log("Current User ID:", userId);
         const fetchConversations = async () => {
         setLoading(true);
         setError(null);
         try {
           const res = await fetch(`${API_BASE}/api/conversations/user/${userId}`, {
               method: "GET",
               headers: token
                  ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
                  : { "Content-Type": "application/json" },
               
            });

            if (!res.ok) {
               const txt = await res.text();
               throw new Error(`Failed to fetch: ${res.status} ${txt}`);
            }

            const data = await res.json();
            // Filter conversations for current user
           
            setConversations(data);
         } catch (err) {
            if (err.name !== "AbortError") setError(err.message || "Unknown error");
         } finally {
            setLoading(false);
         }
      };

      fetchConversations();
      return () => controller.abort();
   }, [API_BASE]);

      // search users when query changes (simple client-side search calling the users endpoint)
      useEffect(() => {
         if (!query || query.trim().length < 2) {
            setSearchResults([]);
            setSelectedUser(null);
            return;
         }

         const controller = new AbortController();
         const token = localStorage.getItem("token") || sessionStorage.getItem("token");
         const fetchUsers = async () => {
            try {
               const res = await fetch(`${API_BASE}/api/authentification`, {
                  headers: token ? { Authorization: `Bearer ${token}` } : {},
                  signal: controller.signal,
               });
               if (!res.ok) {
                  return setSearchResults([]);
               }
               const users = await res.json();
               const q = query.trim().toLowerCase();
               const matches = Array.isArray(users) ? users.filter(u => (u.Username || "").toLowerCase().includes(q)) : [];
               setSearchResults(matches);
            } catch (e) {
               if (e.name !== 'AbortError') setSearchResults([]);
            }
         };
         fetchUsers();
         return () => controller.abort();
      }, [query]);

   const filtered = useMemo(() => {
      return conversations.filter((c) => {
         const themeName = c?.Theme_id?.Name || c?.Theme_id?.name || "";
         const last = Array.isArray(c.Messages) && c.Messages.length ? c.Messages[c.Messages.length - 1].content : "";
         const searchable = `${themeName} ${last}`.toLowerCase();
         return searchable.includes(query.trim().toLowerCase());
      });
   }, [conversations, query]);

   const formatTime = (iso) => {
      if (!iso) return "";
      try {
         const d = new Date(iso);
         const now = Date.now();
         const diff = now - d.getTime();
         const mins = Math.floor(diff / 60000);
         if (mins < 60) return `${mins}m`;
         const hours = Math.floor(mins / 60);
         if (hours < 24) return `${hours}h`;
         const days = Math.floor(hours / 24);
         return `${days}d`;
      } catch (e) {
         return "";
      }
   };

   return (
      <div className="chats-container">
         <header className="chats-header">
            <h2>Chats</h2>
            <button className="new-chat" onClick={async () => {
               // If a user is selected from search, create or open conversation with them
               const user = selectedUser;
               const me = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user"))._id : null;
               if (!user) return alert('Select a user from search first');

               // check if conversation already exists between users
               const existing = conversations.find(conv => {
                  const users = conv.users || conv.Users || [];
                  const userIds = users.map(u => (u._id ? String(u._id) : String(u)));
                  return userIds.includes(String(user._id)) && userIds.includes(String(me));
               });
               if (existing) {
                  navigate(`/chats/${existing._id}`);
                  return;
               }

               // create new conversation
               try {
                  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                  const body = { Messages: [], Seen_messages_id: null, Theme_id: user._id, users: [me, user._id] };
                  const res = await fetch(`${API_BASE}/api/conversations`, {
                     method: 'POST',
                     headers: {
                        'Content-Type': 'application/json',
                        ...(token && { Authorization: `Bearer ${token}` })
                     },
                     body: JSON.stringify(body),
                  });
                  if (!res.ok) throw new Error('Failed to create conversation');
                  const created = await res.json();
                  setConversations(prev => [created, ...prev]);
                  navigate(`/chats/${created._id}`);
               } catch (err) {
                  console.error(err);
                  alert('Could not create conversation');
               }
            }}>New</button>
         </header>

         <div className="chats-search">
            <input
               type="search"
               placeholder="Search"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
            />
            {/* search results dropdown */}
            {searchResults.length > 0 && (
               <ul className="search-results">
                  {searchResults.map(u => (
                     <li key={u._id} className={`search-item ${selectedUser && selectedUser._id === u._id ? 'selected' : ''}`} onClick={() => { setSelectedUser(u); setQuery(u.Username); setSearchResults([]); }}>
                        <img src={u.Profile_picture || '/avatars/default.png'} alt={u.Username} style={{ width: 28, height: 28, borderRadius: 14, marginRight: 8 }} />
                        <span>{u.Username}</span>
                     </li>
                  ))}
               </ul>
            )}
         </div>

         {loading && <div style={{ padding: 12 }}>Loading…</div>}
         {error && <div style={{ padding: 12, color: "#a00" }}>Error: {error}</div>}

         <ul className="chats-list">
            {filtered.map((c, idx) => {
               const msgs = Array.isArray(c.Messages) ? c.Messages : [];
               const lastMsg = msgs.length ? msgs[msgs.length - 1] : null;
               const lastContent = lastMsg ? lastMsg.content : "No messages yet";
               const lastTime = lastMsg ? formatTime(lastMsg.time_sent || lastMsg.createdAt || c.updatedAt || c.createdAt) : formatTime(c.updatedAt || c.createdAt);
               const unread = msgs.filter((m) => m.status === "Not Seen").length;
               const name = lastMsg?.sender_id?.Username || lastMsg?.sender_id || (c?.Theme_id?.Name || c?.Theme_id?.name) || `Conversation ${idx + 1}`;
               const avatar = lastMsg?.sender_id?.Profile_picture || c?.Theme_id?.avatar || c?.Profile_picture || "/avatars/default.png";

               return (
                  <li key={c._id || idx} className="chat-item">
                     <Link to={`/chats/${c._id || idx}`} className="chat-link">

                        <div className="chat-meta">
                           <div className="chat-top">
                              <span className="chat-name">{name}</span>
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

            {!loading && filtered.length === 0 && <li className="no-results">No chats found.</li>}
         </ul>
      </div>
   );
}

export default Chats;


