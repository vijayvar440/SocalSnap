import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [posts, setPosts] = useState([]);

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

                    {/* Debug */}
                    <p><b>Media Type:</b> {post.mediaType}</p>
                    <p><b>Media URL:</b> {post.media}</p>

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
                            Your browser does not support video.
                        </video>
                    )}

                    {post.mediaType === "audio" && post.media && (
                        <audio controls>
                            <source src={post.media} type="audio/mpeg" />
                            Your browser does not support audio.
                        </audio>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Home;