import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { saveAuth } from "../utils/auth";
import Navbar from "./Navbar"; // adjust path if needed


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    });

    console.log("Login response:", res.data); // 👈 Check response

    // Adjust based on your backend response
    const token = res.data.token || res.data.data?.token;
    const role = res.data.role || res.data.data?.role || res.data.user?.role;

    if (!token || !role) {
      setError("Invalid response from server");
      return;
    }

    saveAuth(token, role);

    if (role === "Admin") navigate("/admin");
    else if (role === "Manager") navigate("/manager");
    else navigate("/user");

  } catch (err: any) {
    setError(err.response?.data?.message || "Login failed");
  }
};

  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center h-screen bg-gray-100">

      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
    </>
  );
}
