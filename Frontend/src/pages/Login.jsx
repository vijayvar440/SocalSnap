import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    useEffect(()=> {
        const token = localStorage.getItem("token");
        if(token){
            navigate("/")
        }
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/loginuser",
                {
                    email,
                    password
                },
                {
                    withCredentials:true
                }
            );

            console.log(response.data);
            localStorage.setItem("token",response.data.token);
            navigate("/")
            console.log(localStorage.getItem("token"));


        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <br />
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <br />

                <div>
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <br />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;