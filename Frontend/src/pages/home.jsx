import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [posts, setPosts] = useState([]);

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
                        border: "1px solid gray",
                        padding: "20px",
                        marginBottom: "20px",
                        width: "350px"
                    }}
                >
                    <h2>{post.title}</h2>

                    <p>{post.description}</p>

                    {post.image && (
                        <img
                            src={post.image}
                            alt={post.title}
                            width="300"
                        />
                    )}

                    <br />
                    <br />

                    {post.video && (
                        <video
                            src={post.video}
                            width="300"
                            controls
                        />
                    )}

                    <br />
                    <br />

                    {post.audio && (
                        <audio
                            src={post.audio}
                            controls
                        />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Home;