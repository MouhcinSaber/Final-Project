import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE } from "../../settings";
import './Otherprofiles.css';
function Otherprofiles() {
   //get other users profiles by id
    const { id: paramId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   // const token = useSelector(state => state.user.token);
    useEffect(() => {
        const controller = new AbortController();
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const fetchUserProfile = async () => {
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
                const found = Array.isArray(userProfiles) ? userProfiles.find((u) => u._id === paramId) : null;
                if (!found) {
                    throw new Error("User profile not found");
                }
                setUser(found);
            } catch (err) {
                if (err.name !== "AbortError") setError(err.message || "Unknown error");
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
        return () => controller.abort();
    }, [paramId]);
    if (loading) return <div className="profile-root">Loading profile…</div>;
    if (error) return <div className="profile-root error">Error: {error}</div>;
    if (!user) return <div className="profile-root">No user data.</div>;
    return (
        <div className="profile-root">
            <h2>
                Profile of {user.FirstName} {user.LastName}
            </h2>
             {user.Profile_picture && (
                <div>
                    <img src={user.Profile_picture} alt="Profile" width={150} />
                </div>
            )}
            <p>Username: {user.Username}</p>
            <p>Email: {user.email}</p>
            <p>Field of Study: {user.Field_of_study}</p>
            <p>University: {user.University_name}</p>
            <p>Gender: {user.Gender}</p>
           
        </div>
    );
}
export default Otherprofiles;                                                                                                                 