import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import EditProfile from "./pages/EditProfile";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./ProtectedRoute";
import EditPost from "./pages/EditPost";
import SinglePost from "./pages/SinglePost";
import UserProfile from "./pages/UserProfile";



function App() {
    return (
        <>
            <Navbar />
            

            <Routes>

                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post/:id" element={<SinglePost />} />
                <Route path="/user/:id" element={<UserProfile />} />

                {/* Protected Profile */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

                {/* Protected Create Post */}
                <Route
                    path="/create-post"
                    element={
                        <ProtectedRoute>
                            <CreatePost />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/edit-post/:id"
                        element={
                      <ProtectedRoute>
                      <EditPost />
                     </ProtectedRoute>
                   }
                />

                {/* Protected Edit Profile */}
                <Route
                    path="/edit-profile"
                    element={
                        <ProtectedRoute>
                            <EditProfile />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </>
    );
}

export default App;