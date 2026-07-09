import { Link , useNavigate } from "react-router-dom";

function Navbar() {


    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () =>{
        localStorage.removeItem("token");
        navigate("/login")
       
    };
    return (
        <nav>
            <h2>SocialSnap</h2>

            <Link to="/">Home</Link>
            {token ? (
                <button onClick={handleLogout}>Logout</button>
            ):(
                 <Link to="/login">Login</Link>

            )}
           
            <Link to="/register">Register</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/create-post">Create Post</Link>
        </nav>
    );
}

export default Navbar;