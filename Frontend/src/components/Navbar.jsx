import { Link, useNavigate } from "react-router-dom";
import {
    House,
    Search,
    SquarePlus,
    CircleUserRound,
    LogOut
} from "lucide-react";

import "./Navbar.css";

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
                SocialApp
            </div>

            <div className="search">

                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search users..."
                />

            </div>

            <div className="nav-menu">

                <Link to="/">
                    <House size={22}/>
                    <span>Home</span>
                </Link>

                <Link to="/create-post">
                    <SquarePlus size={22}/>
                    <span>Create</span>
                </Link>

                <Link to="/profile">
                    <CircleUserRound size={22}/>
                    <span>Profile</span>
                </Link>

                <button onClick={logout}>
                    <LogOut size={20}/>
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;