import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/api/Post/all-posts"
            );

            setPosts(response.data.posts)


        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

   return (
    <div>
        <h1>Home Page</h1>

        {
            posts.map((post) => (
                <div key={post._id}>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>

                    <img
                        src={post.image}
                        alt={post.title}
                        width="300"
                    />
                </div>
            ))
        }
    </div>
);
}

export default Home;