import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_BASE } from "../../settings";
import './Chats.css';

function Chats() {
   const [conversations, setConversations] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const [query, setQuery] = useState("");
    // const token = useSelector(state => state.user.token);

  

   useEffect(() => {
      const controller = new AbortController();
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      const fetchConversations = async () => {
         setLoading(true);
         setError(null);
         try {
            const res = await fetch(`${API_BASE}/api/conversations`, {
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
            // Ensure array
            setConversations(Array.isArray(data) ? data : []);
         } catch (err) {
            if (err.name !== "AbortError") setError(err.message || "Unknown error");
         } finally {
            setLoading(false);
         }
      };

      fetchConversations();
      return () => controller.abort();
   }, [API_BASE]);

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
            <button className="new-chat">New</button>
         </header>

         <div className="chats-search">
            <input
               type="search"
               placeholder="Search"
               value={query}
               onChange={(e) => setQuery(e.target.value)}
            />
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
               const name = c?.Theme_id?.Name || c?.Theme_id?.name || (lastMsg?.sender_id?.Username ?? lastMsg?.sender_id) || `Conversation ${idx + 1}`;
               const avatar = c?.Theme_id?.avatar || c?.Profile_picture || "/avatars/default.png";

               return (
                  <li key={c._id || idx} className="chat-item">
                     <Link to={`/chat/${c._id || idx}`} className="chat-link">

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


