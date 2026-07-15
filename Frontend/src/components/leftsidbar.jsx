import "./LeftSidebar.css";

function LeftSidebar() {
    return (
        <div className="left-sidebar">

            <div className="profile-card">
                <div className="profile-avatar">
                    V
                </div>

                <h3>Vijay</h3>

                <p>Full Stack Developer</p>
            </div>

            <div className="menu">

                <div className="menu-item">
                    🏠 Home
                </div>

                <div className="menu-item">
                    👤 Profile
                </div>

                <div className="menu-item">
                    ❤️ Saved
                </div>

                <div className="menu-item">
                    ⚙ Settings
                </div>

            </div>

        </div>
    );
}

export default LeftSidebar;