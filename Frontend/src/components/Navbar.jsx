import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <h2>SocialSnap</h2>

            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/create-post">Create Post</Link>
        </nav>
    );
}

export default Navbar;