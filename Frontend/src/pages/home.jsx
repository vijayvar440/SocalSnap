import { useState, useEffect } from "react";
import axios from "axios";

function Home() {

    const [posts, setPosts] = useState([]);
    const [comment, setComment] = useState("");

    const fetchPosts = async () => {
        try {

            const response = await axios.get(
                "http://localhost:3000/api/Post/all-posts"
            );

            console.log(response.data.posts);

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
        <div>

            <h1>Home Page</h1>

            {posts.map((post) => (

                <div
                    key={post._id}
                    style={{
                        border: "1px solid #ccc",
                        padding: "20px",
                        marginBottom: "20px",
                        borderRadius: "10px",
                    }}
                >

                    <h2>{post.title}</h2>

                    <p>{post.description}</p>

                    {post.mediaType === "image" && post.media && (
                        <img
                            src={post.media}
                            alt={post.title}
                            width="300"
                        />
                    )}

                    {post.mediaType === "video" && post.media && (
                        <video width="300" controls>
                            <source src={post.media} type="video/mp4" />
                        </video>
                    )}

                    {post.mediaType === "audio" && post.media && (
                        <audio controls>
                            <source src={post.media} type="audio/mpeg" />
                        </audio>
                    )}

                    <br /><br />

                    <button onClick={() => handleLike(post._id)}>
                        ❤️ Like
                    </button>

                    <p>
                        Likes : {post.likes ? post.likes.length : 0}
                    </p>
                    <hr />

<h3>Comments ({post.comments?.length || 0})</h3>

{post.comments?.map((c, index) => (
    <p key={index}>
        {c.text}
    </p>
))}

<input
    type="text"
    placeholder="Write a comment..."
    value={comment}
    onChange={(e) => setComment(e.target.value)}
/>

<button onClick={() => handleComment(post._id)}>
    Post
</button>

                </div>
                

            ))}

        </div>
    );
}

export default Home;