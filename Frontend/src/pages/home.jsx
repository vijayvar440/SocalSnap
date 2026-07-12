import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

function Home() {

    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState("");

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
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
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
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert("Post Deleted Successfully");

            fetchPosts();

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    const handleComment = async (postId) => {

        if (!comment.trim()) return;

        try {

            await axios.post(
                `http://localhost:3000/api/Post/comment/${postId}`,
                {
                    text: comment
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            setComment("");
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

        <h1 className="home-title">SocialSnap Feed</h1>

        <div className="feed">

            {posts.map((post) => (

                <div key={post._id} className="post-card">

                    <div className="post-header">

                        <div className="user-info">
                            <div className="avatar">
                                {post.title?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <h3>{post.title}</h3>
                                <p>{post.description}</p>
                            </div>
                        </div>

                    </div>

                    {post.mediaType === "image" && post.media && (
                        <img
                            src={post.media}
                            alt={post.title}
                            className="post-image"
                        />
                    )}

                    {post.mediaType === "video" && post.media && (
                        <video className="post-video" controls>
                            <source src={post.media} type="video/mp4" />
                        </video>
                    )}

                    {post.mediaType === "audio" && post.media && (
                        <audio className="post-audio" controls>
                            <source src={post.media} type="audio/mpeg" />
                        </audio>
                    )}

                    <div className="action-bar">

                        <button
                            className="like-btn"
                            onClick={() => handleLike(post._id)}
                        >
                            ❤️ Like
                        </button>

                        <button
                            className="delete-btn"
                            onClick={() => handleDelete(post._id)}
                        >
                            🗑 Delete
                        </button>

                    </div>

                    <p className="likes">
                        ❤️ {post.likes?.length || 0} Likes
                    </p>

                    <hr />

                    <h4>
                        💬 Comments ({post.comments?.length || 0})
                    </h4>

                    <div className="comments">

                        {post.comments?.map((c, index) => (

                            <div key={index} className="comment-box">
                                {c.text}
                            </div>

                        ))}

                    </div>

                    <div className="comment-area">

                        <input
                            type="text"
                            placeholder="Write a comment..."
                            className="comment-input"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />

                        <button
                            className="comment-btn"
                            onClick={() => handleComment(post._id)}
                        >
                            Post
                        </button>

                    </div>

                </div>

            ))}

        </div>

    </div>
);
}

export default Home;