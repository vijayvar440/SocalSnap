import { Link, useNavigate } from "react-router-dom";
import "./Nabar.css";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        navigate("/login");
    };

    return (

        <nav className="navbar">

            <div className="logo">
                🚀 SocialApp
            </div>

            <input
                type="text"
                placeholder="Search..."
                className="search-box"
            />

            <div className="nav-links">

                <Link to="/">🏠 Home</Link>

                <Link to="/create-post">➕ Create</Link>

                <Link to="/profile">👤 Profile</Link>

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>

    );
}

export default Navbar;