import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE } from "../../settings";
import './Profil.css';

function Profil() {
    const { id: paramId } = useParams();
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 


    // Helper to safely decode JWT payload and extract user id
    const getUserIdFromToken = (token) => {
        if (!token) return null;
        try {
            const parts = token.split('.');
            if (parts.length !== 3) return null;
            const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
            const json = JSON.parse(decodeURIComponent(escape(window.atob(payload))));
            return json?.user?.id || json?.user?._id || null;
        } catch (e) {
            return null;
        }
    };

    useEffect(() => {
        // Use id from route param if present, otherwise from JWT token
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const tokenId = getUserIdFromToken(token);
        const id = paramId || tokenId;

        if (!id) {
            setError("No user id provided and no token found");
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchUserProfileAndConversations = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch all user profiles then select by id (UserProfile collection)
                const userRes = await fetch(`${API_BASE}/api/authentification`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    signal: controller.signal,
                });
                if (!userRes.ok) throw new Error(`Failed to fetch user profile: ${userRes.status}`);
                const userProfiles = await userRes.json();
                const found = Array.isArray(userProfiles) ? userProfiles.find((u) => u._id === id) : null;
                if (!found) {
                    throw new Error("User profile not found");
                }
                setUser(found);

                // If user has conversation ids, fetch them in parallel
                const convIds = Array.isArray(found.Conversations) ? found.Conversations : [];
                const convs = await Promise.all(
                    convIds.map(async (convId) => {
                        try {
                            const r = await fetch(`${API_BASE}/api/conversations/${convId}`, {
                                headers: token ? { Authorization: `Bearer ${token}` } : {},
                                signal: controller.signal,
                            });
                            if (!r.ok) return null;
                            return await r.json();
                        } catch (e) {
                            return null;
                        }
                    })
                );
                setConversations(convs.filter(Boolean));
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message || "Error");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfileAndConversations();
        return () => controller.abort();
    }, [paramId]);

    if (loading) return <div className="profile-root">Loading profile…</div>;
    if (error) return <div className="profile-root error">Error: {error}</div>;
    if (!user) return <div className="profile-root">No user data.</div>;

    const avatar = user.Profile_picture || "/avatars/default.png";

    return (
        <div className="profilcontainer">
            <div className="profil">
                <img src={avatar} alt={user.Username} onError={(e)=>{e.currentTarget.onerror=null; e.currentTarget.src='/avatars/default.png'}}/>
                <div >
                    <h2 >{user.Username}</h2>
                    <div className="study">{user.Field_of_study} • {user.University_name}</div>
                    <div className="email">{user.email}</div>
                    <div>
                        <div><strong>{conversations.length}</strong> conversations</div>
                        <div><strong>{user.Type_User || 'User'}</strong></div>
                    </div>

                    <div >
                        <Link to={`/message/${user._id}`} className="btn primary">Message</Link>
                        <button className="btn">Follow</button>
                    </div>
                </div>
            </div>

            <section >
                <h3>Conversations</h3>
                {conversations.length === 0 && <div className="no-conv">No conversations to show.</div>}
                <ul>
                    {conversations.map((c) => (
                        <li key={c._id} className="conv-item">
                            <Link to={`/chat/${c._id}`}>
                                <div className="conv-title">{c.Theme_id?.Name || c.Theme_id?.name || `Conversation ${c._id}`}</div>
                                <div className="conv-last">{Array.isArray(c.Messages) && c.Messages.length ? c.Messages[c.Messages.length-1].content : 'No messages yet'}</div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}

export default Profil;

