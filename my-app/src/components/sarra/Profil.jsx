import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE } from "../../settings";
import "./Profil.css";

function Profil() {
    const { id: paramId } = useParams();
    const [user, setUser] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Decode JWT safely
    const getUserIdFromToken = (token) => {
        if (!token) return null;
        try {
            const parts = token.split(".");
            if (parts.length !== 3) return null;

            const payload = parts[1]
                .replace(/-/g, "+")
                .replace(/_/g, "/");

            const json = JSON.parse(
                decodeURIComponent(escape(window.atob(payload)))
            );

            return json?.user?.id || json?.user?._id || null;
        } catch {
            return null;
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const tokenId = getUserIdFromToken(token);
        const id = paramId || tokenId;

        if (!id) {
            setError("No user id provided and no token found");
            setLoading(false);
            return;
        }

        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch all users
                const res = await fetch(`${API_BASE}/api/authentification`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                    signal: controller.signal,
                });

                if (!res.ok) throw new Error("Failed to fetch user profile");

                const allUsers = await res.json();
                const foundUser = allUsers.find((u) => u._id === id);

                if (!foundUser) throw new Error("User profile not found");
                setUser(foundUser);

                // Fetch conversations
                const convIds = Array.isArray(foundUser.Conversations)
                    ? foundUser.Conversations
                    : [];

                const convs = await Promise.all(
                    convIds.map(async (convId) => {
                        try {
                            const convRes = await fetch(
                                `${API_BASE}/api/conversations/${convId}`,
                                {
                                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                                    signal: controller.signal,
                                }
                            );
                            if (!convRes.ok) return null;
                            return await convRes.json();
                        } catch {
                            return null;
                        }
                    })
                );

                setConversations(convs.filter(Boolean));
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        return () => controller.abort();
    }, [paramId]);

    if (loading) return <div className="profile-root">Loading profile…</div>;
    if (error) return <div className="profile-root error">Error: {error}</div>;
    if (!user) return <div className="profile-root">No user data.</div>;

    const avatar = user.Profile_picture || "/avatars/default.png";

    return (
        <div className="profilcontainer">
            <div className="profil">
                
                {/* Avatar */}
                <img
                    src={avatar}
                    alt={user.Username}
                    onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/avatars/default.png";
                    }}
                />

                {/* User Info */}
                <h2>{user.FirstName} {user.LastName}</h2>

                <div className="study">
                    {user.Field_of_study || 'Student'}
                </div>

                <div className="email">@{user.Username} • {user.email}</div>

                {/* Details Section */}
                <section>
                    <h3>Details</h3>
                    <ul>
                        <li><strong>University:</strong> {user.University_name || '—'}</li>
                        <li><strong>Field of Study:</strong> {user.Field_of_study || '—'}</li>
                        <li><strong>Gender:</strong> {user.Gender || '—'}</li>
                        <li><strong>Email:</strong> {user.email || '—'}</li>
                        <li><strong>User Type:</strong> {user.Type_User || 'User'}</li>
                    </ul>
                </section>

            </div>
        </div>
    );
}

export default Profil;
