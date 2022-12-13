import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hifi-server.onrender.com/loginuser",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data;
        alert(data.msg);
        navigate("/");
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-container">
          <form method="POST" onSubmit={loginUser}>
            <h2 className="text-center mb-3">LOGIN</h2>
            <div class="form-outline mb-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="form2Example1"
                class="form-control"
                placeholder="Email"
              />
            </div>

            <div class="form-outline mb-4">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="form2Example2"
                class="form-control"
                placeholder="Password"
              />
            </div>

            <button type="submit" class="btn-primary form-button">
              Sign in
            </button>

            <div class="text-center">
              <p>
                Not a member? <NavLink to="/signup">Register</NavLink>
              </p>

            </div>
          </form>
        </div>
        <div className="text-container">
          <h1>HiFi</h1>
          <p>A social media platform</p>
        </div>
      </div>
    </>
  );
};

export default Login;
