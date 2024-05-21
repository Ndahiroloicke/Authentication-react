import React, { useState } from 'react';

const Register = () => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from submitting and causing a page reload
        const mainOne = { user, email, password };

        try {
            const response = await fetch("http://localhost:9000/register", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(mainOne),
            });

            if (response.ok) {
                setSuccess("Registration successful!");
                setError("");
                // Clear input fields after successful registration
                setUser("");
                setEmail("");
                setPassword("");
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            setError(error.message);
            setSuccess("");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Register;
