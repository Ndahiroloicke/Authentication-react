import React, { useState } from "react";
import login from "./assets/login page.png"
const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting and causing a page reload

    try {
      const response = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user, password }),
      });

      if (response.ok) {
        setSuccess("Login successful!");
        setError("");
        // Clear input fields after successful login
        setUser("");
        setPassword("");
      } else {
        const data = await response.json();
        throw new Error(data.error || "Login failed");
      }
    } catch (error) {
      setError(error.message);
      setSuccess("");
    }
  };

  return (
    <div className="bg-slate-300 flex flex-row justify-between ">
      <form onSubmit={handleSubmit}>
        <div>
          <h1 className="text-4xl font-bold">Login</h1>
        </div>
        <div>
          <label htmlFor="username" className="w-[500px] mx-[20px]">Username</label>
          <input
            id="username"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="w-[500px] mx-[20px]">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div>
        <img src={login} alt="" className="h-3/4" />
      </div>
    </div>
  );
};

export default Login;
