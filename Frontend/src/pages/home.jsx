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
            console.log("Posts:", response.data.posts);
             console.log("Owner Object:", response.data.posts[0].uploadedBy);
             console.log("Username:", response.data.posts[0].uploadedBy.username);
             console.log("Owner ID:", response.data.posts[0].uploadedBy._id);
              console.log("My ID:", localStorage.getItem("userId"));
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

    const text = comments[postId];

    if (!text?.trim()) return;

    try {

        await axios.post(
            `http://localhost:3000/api/Post/comment/${postId}`,
            { text },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
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
    useEffect(() => {
        fetchPosts();
    }, []);
    return (
    <div className="home-container">



        <div className="feed">

            {posts.map((post) => (

                <div key={post._id} className="post-card">

                        <div className="post-header">
                       
                           <div className="user-info">
                       
                               <div className="avatar">
                                   {post.uploadedBy?.profileImage ? (
                                       <img
                                           src={post.uploadedBy.profileImage}
                                           alt="profile"
                                           className="profile-img"
                                       />
                                   ) : (
                                       post.uploadedBy?.username?.charAt(0).toUpperCase()
                                   )}
                               </div>
                       
                               <div>
                                   <h3>{post.uploadedBy?.username}</h3>
                               </div>
                       
                           </div>
                       
                           <h2 className="post-title">{post.title}</h2>
                       
                           <p>{post.description}</p>
                       
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




                          {String(post.uploadedBy?._id) === String(userId) && (
                            <>
                                <button
                                    className="edit-btn"
                                    onClick={() => navigate(`/edit-post/${post._id}`)}
                                >
                                    ✏️ Edit
                                </button>
                        
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(post._id)}
                                >
                                    🗑 Delete
                                </button>
                            </>
                        )}




                    </div>

                    <p className="likes">
                        ❤️ {post.likes?.length || 0} Likes
                    </p>

                    <hr />

                    <h4>
                        💬 Comments ({post.comments?.length || 0})
                    </h4>

                   <div className="comments">
                    
                        {(showMore[post._id]
                            ? post.comments
                            : post.comments?.slice(0, 1)
                        ).map((c, index) => (
                    
                            <div key={index} className="comment-box">
                                {c.text}
                            </div>
                    
                        ))}
                    
                    </div>
                    {post.comments?.length > 1 && (
                         <button
                             className="show-more-btn"
                             onClick={() =>
                                 setShowMore((prev) => ({
                                     ...prev,
                                     [post._id]: !prev[post._id]
                                 }))
                             }
                         >
                             {showMore[post._id] ? "Show Less" : "Show More"}
                         </button>
                     )}

                    <div className="comment-area">

                      <input
                              type="text"
                              placeholder="Write a comment..."
                              className="comment-input"
                              value={comments[post._id] || ""}
                              onChange={(e) =>
                              setComments((prev) => ({
                                  ...prev,
                                  [post._id]: e.target.value
                              }))
                               }
                                  
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