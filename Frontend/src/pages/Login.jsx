import { useState } from "react";

function Login() {
    const [email , setEmail] = useState("");
    
   const [password, setPassword] = useState("");
    return (

        <div>
            <h1>Login</h1>

            <form>
                <div>
                    <label>Email</label>
                    <br />
                    <input type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <label >Passwerd</label>
                    <br />
                    <input type="Password"
                    placeholder="Enter passwerd"
                    value = {passwerd}
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