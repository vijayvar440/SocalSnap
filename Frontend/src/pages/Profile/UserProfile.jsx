import { useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { useNavigate, useParams } from "react-router-dom";

function UserProfile() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [following, setFollowing] = useState(false);

    const fetchUserProfile = async () => {

        try {

            const response = await axios.get(
                `http://localhost:3000/api/Post/user/${id}`
            );

            setUser(response.data.user);
            setPosts(response.data.posts);

            const loggedUserId = localStorage.getItem("userId");

            setFollowing(
                response.data.user.followers.some((item) => {
                    return item === loggedUserId || item._id === loggedUserId;
                })
            );

        } catch (err) {

            console.log(err.response?.data || err.message);

        }

    };

    const handleFollow = async () => {
    try {

        const response = await axios.put(
            `http://localhost:3000/api/Post/follow/${id}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        alert(response.data.message);

        fetchUserProfile();

        setFollowing(!following);

    } catch (err) {

        console.log(err.response?.data || err.message);

    }
};

    useEffect(() => {

        fetchUserProfile();

    }, [id]);

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (

        <div className="profile-container">

            <button
                className="back-btn"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>

            <div className="profile-top">

                <img
                    className="profile-avatar"
                    src={
                        user.profileImage
                            ? user.profileImage
                            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt=""
                />

                <div className="profile-info">

                    <h2>{user.username}</h2>

                    <p>{user.email}</p>

                    <p>{user.bio || "No Bio Available"}</p>

                    <div className="profile-stats">

                        <span>
                            <strong>{posts.length}</strong> Posts
                        </span>



                        <span
                            onClick={() => navigate(`/followers/${id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <strong>{user.followers?.length || 0}</strong> Followers
                        </span>
                        
                        <span
                            onClick={() => navigate(`/following/${id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <strong>{user.following?.length || 0}</strong> Following
                        </span>




                    </div>

                    <button
                         className="edit-btn"
                         onClick={handleFollow}
                         >
                         {following ? "Following" : "Follow"}
                     </button>

                </div>

            </div>

            <hr />

            <div className="posts-grid">
                                {posts.map((post) => (

                    <div
                        className="post-card"
                        key={post._id}
                        onClick={() => navigate(`/post/${post._id}`)}
                    >

                        {post.mediaType === "image" && (
                            <img
                                src={post.media}
                                alt={post.title}
                            />
                        )}

                        {post.mediaType === "video" && (
                            <video controls>
                                <source
                                    src={post.media}
                                    type="video/mp4"
                                />
                            </video>
                        )}

                        {post.mediaType === "audio" && (
                            <audio controls>
                                <source
                                    src={post.media}
                                    type="audio/mpeg"
                                />
                            </audio>
                        )}

                        <h3>{post.title}</h3>

                        <p>{post.description}</p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default UserProfile;
        