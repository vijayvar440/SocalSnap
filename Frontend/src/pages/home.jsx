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
                "http://localhost:3000/api/post/all-posts"
            );

            setPosts(response.data.posts);

        } catch (err) {

            console.log(err.response?.data || err.message);

        }

    };

    useEffect(() => {

        fetchPosts();

    }, []);

    const handleLike = async (postId) => {

        try {

            await axios.put(

                `http://localhost:3000/api/post/like/${postId}`,

                {},

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

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

                `http://localhost:3000/api/post/delete/${postId}`,

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

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

        const text = comments[postId];

        if (!text?.trim()) return;

        try {

            await axios.post(

                `http://localhost:3000/api/post/comment/${postId}`,

                { text },

                {

                    headers: {

                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`

                    }

                }

            );

            setComments((prev) => ({

                ...prev,

                [postId]: ""

            }));

            fetchPosts();

        } catch (err) {

            console.log(err.response?.data || err.message);

        }

    };

    return (

        <div className="home-container">

            <div className="feed">

                {

                    posts.map((post) => (

                        <div

                            key={post._id}

                            className="post"

                            onClick={() =>
                                navigate(`/post/${post._id}`)
                            }

                        >

                            {/* Header */}

                            <div className="post-header">

                                <div className="user">

                                    {

                                        post.uploadedBy?.profileImage ?

                                            (

                                                <img

                                                    src={post.uploadedBy.profileImage}

                                                    alt="profile"

                                                    className="profile"

                                                />

                                            )

                                            :

                                            (

                                                <div className="profile">

                                                    {

                                                        post.uploadedBy?.username

                                                            ?.charAt(0)

                                                            .toUpperCase()

                                                    }

                                                </div>

                                            )

                                    }

                                    <div>

                                        <h3>

                                            {

                                                post.uploadedBy?.username

                                            }

                                        </h3>

                                        <span>

                                            {

                                                new Date(

                                                    post.createdAt

                                                ).toLocaleDateString()

                                            }

                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* Title */}

                            <h2>

                                {post.title}

                            </h2>

                            {/* Description */}

                            <p>

                                {post.description}

                            </p>
                          {/* Media */}

                            {post.mediaType === "image" && (
                               <img
                                  src={post.media}
                                  alt={post.title}
                                  className="post-image"
                                  onClick={() => navigate(`/post/${post._id}`)}
                              />
                            )}

                            {post.mediaType === "video" && (
                                <video controls className="media">
                                    <source
                                        src={post.media}
                                        type="video/mp4"
                                    />
                                </video>
                            )}

                            {post.mediaType === "audio" && (
                                <audio controls className="audio">
                                    <source
                                        src={post.media}
                                        type="audio/mpeg"
                                    />
                                </audio>
                            )}

                            {/* Actions */}

                            <div className="actions">

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleLike(post._id);
                                    }}
                                >
                                    ❤️ {post.likes?.length || 0}
                                </button>

                                {String(post.uploadedBy?._id) ===
                                    String(userId) && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(
                                                    `/edit-post/${post._id}`
                                                );
                                            }}
                                        >
                                            ✏️ Edit
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(post._id);
                                            }}
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
                                )?.map((c, index) => (

                                    <div
                                        key={index}
                                        className="comment-box"
                                    >
                                        {c.text}
                                    </div>

                                ))}

                                {post.comments?.length > 1 && (

                                    <button
                                        className="show-more-btn"
                                        onClick={(e) => {

                                            e.stopPropagation();

                                            setShowMore((prev) => ({
                                                ...prev,
                                                [post._id]:
                                                    !prev[post._id],
                                            }));

                                        }}
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
                                    value={
                                        comments[post._id] || ""
                                    }
                                    onClick={(e) =>
                                        e.stopPropagation()
                                    }
                                    onChange={(e) =>
                                        setComments((prev) => ({
                                            ...prev,
                                            [post._id]:
                                                e.target.value,
                                        }))
                                    }
                                />

                                <button
                                    onClick={(e) => {

                                        e.stopPropagation();

                                        handleComment(post._id);

                                    }}
                                >
                                    Post
                                </button>

                            </div>

                            <hr />

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Home;