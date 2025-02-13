import React, { useState, useEffect } from "react";
import { registerUser } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/books"); // Redirect if user is already signed in
    }
  }, [user, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      const response = await registerUser({ email, password });
      login(response.data.token);
      alert("Register successfully");
      navigate("/books"); // Redirect to books page after successful registration
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed. Please try again.");
      console.error("Registration failed", error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h2 className="text-center mb-4">Register</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <div className="text-center mt-3">
          <p>Already have an account? <button className="btn btn-link p-0" onClick={() => navigate("/login")}>Login</button></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
