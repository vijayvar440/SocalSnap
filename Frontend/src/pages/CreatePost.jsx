import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [audio, setAudio] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("video", video);
        formData.append("audio", audio);

        try {
            const response = await axios.post(
                "http://localhost:3000/api/Post/createPost",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            console.log(response.data);
            alert("Post Created Successfully ✅");

            navigate("/");

        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };

    return (
        <div>
            <h1>Create Post</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br /><br />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br /><br />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />

                <br /><br />

                <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideo(e.target.files[0])}
                />

                <br /><br />

                <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setAudio(e.target.files[0])}
                />

                <br /><br />

                <button type="submit">
                    Create Post
                </button>

            </form>
        </div>
    );
}

export default CreatePost;