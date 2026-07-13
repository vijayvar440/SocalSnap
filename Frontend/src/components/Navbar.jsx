import { Link, useNavigate } from "react-router-dom";
import "./Nabar.css";

function Navbar() {

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (

        <nav className="navbar">

            <div className="logo">
                📸 SocialSnap
            </div>

            <div className="nav-links">

                <Link to="/">Home</Link>

                {token && (
                    <>
                        <Link to="/create-post">Create Post</Link>
                        <Link to="/profile">Profile</Link>
                    </>
                )}

                {!token ? (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                ) : (
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                )}

            </div>

        </nav>

    );
}

export default Navbar;