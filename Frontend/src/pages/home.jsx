import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.css";

function Home() {
    const [posts, setPosts] = useState([]);
    const [comments, setComments] = useState({});
    const [showMore, setShowMore] = useState({});

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/Post/all-posts"
            );

            setPosts(response.data.posts);
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    const handleLike = async (postId) => {
        try {
            await axios.put(
                `http://localhost:3000/api/Post/like/${postId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            fetchPosts();
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(
                `http://localhost:3000/api/Post/delete/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            alert("Post Deleted");
            fetchPosts();
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    const handleComment = async (postId) => {
        const text = comments[postId];

        if (!text?.trim()) return;

        try {
            await axios.post(
                `http://localhost:3000/api/Post/comment/${postId}`,
                { text },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            setComments((prev) => ({
                ...prev,
                [postId]: "",
            }));

            fetchPosts();
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div className="home-container">
            <div className="feed">

                {posts.map((post) => (
                    <div key={post._id} className="post">

                        {/* Header */}

                        <div className="post-header">

                            <div className="user">

                                {post.uploadedBy?.profileImage ? (
                                    <img
                                        src={post.uploadedBy.profileImage}
                                        alt=""
                                        className="profile"
                                    />
                                ) : (
                                    <div className="profile">
                                        {post.uploadedBy?.username
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}

                                <div>
                                    <h3>{post.uploadedBy?.username}</h3>
                                    <span>
                                        {new Date(
                                            post.createdAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Title */}

                        <h2>{post.title}</h2>

                        {/* Description */}

                        <p>{post.description}</p>

                        {/* Media */}

                        {post.mediaType === "image" && (
                            <img
                                src={post.media}
                                alt=""
                                className="media"
                            />
                        )}

                        {post.mediaType === "video" && (
                            <video controls className="media">
                                <source src={post.media} type="video/mp4" />
                            </video>
                        )}

                        {post.mediaType === "audio" && (
                            <audio controls className="audio">
                                <source src={post.media} type="audio/mpeg" />
                            </audio>
                        )}

                        {/* Buttons */}

                        <div className="actions">

                            <button onClick={() => handleLike(post._id)}>
                                ❤️ {post.likes?.length}
                            </button>

                            {String(post.uploadedBy?._id) === String(userId) && (
                                <>
                                    <button
                                        onClick={() =>
                                            navigate(`/edit-post/${post._id}`)
                                        }
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(post._id)
                                        }
                                    >
                                        🗑 Delete
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Comments */}

                        <div className="comments">

                            {(showMore[post._id]
                                ? post.comments
                                : post.comments?.slice(0, 1)
                            ).map((c, i) => (
                                <p key={i}>{c.text}</p>
                            ))}

                            {post.comments?.length > 1 && (
                                <button
                                    onClick={() =>
                                        setShowMore((prev) => ({
                                            ...prev,
                                            [post._id]:
                                                !prev[post._id],
                                        }))
                                    }
                                >
                                    {showMore[post._id]
                                        ? "Show Less"
                                        : "Show More"}
                                </button>
                            )}
                        </div>

                        {/* Comment Input */}

                        <div className="comment-input-area">

                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={comments[post._id] || ""}
                                onChange={(e) =>
                                    setComments((prev) => ({
                                        ...prev,
                                        [post._id]: e.target.value,
                                    }))
                                }
                            />

                            <button
                                onClick={() =>
                                    handleComment(post._id)
                                }
                            >
                                Post
                            </button>

                        </div>

                        <hr />

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;