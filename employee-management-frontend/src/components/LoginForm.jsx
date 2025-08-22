import React, { useState } from "react";
import axios from "axios";

function LoginForm({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const authHeader = "Basic " + btoa(username + ":" + password);

      const resp = await axios.get("http://localhost:8080/api/employees", {
        headers: { Authorization: authHeader },
      });

     
      if (resp.status === 200) {
        console.log(" Login successful");
        setAuth(authHeader);
      } else {
        console.warn("⚠️ Login failed, non-200 status:", resp.status);
        alert("Login failed! Status: " + resp.status);
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        // server responded with error status
        console.error("Server status:", err.response.status);
        console.error("Server data:", err.response.data);
      } else if (err.request) {
        // request made but no response
        console.error("No response received:", err.request);
      } else {
        // request config issue
        console.error("Error setting up request:", err.message);
      }

      alert("Invalid credentials! ");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #e0f7fa, #f1f8e9)",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          width: "320px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#00796b" }}>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          type="submit"
          style={{
            marginTop: "15px",
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            background: "#00796b",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
