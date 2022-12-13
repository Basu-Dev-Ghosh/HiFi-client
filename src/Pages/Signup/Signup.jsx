import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase-config";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { authContext } from "../../contexts/authContext";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { setIsAuth } = useContext(authContext);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://hifisocialmedia.herokuapp.com/adduser", {
        name,
        email,
        password,
      });
      if (res.status === 200) {
        const data = res.data;
        alert(data.msg);
        navigate("/login");
      } else if (res.status === 422) {
        const data = res.data;
        alert(data.msg);
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };





  return (
    <>
      <div className="login">
        <div className="login-container">
          <form method="POST" onSubmit={createUser}>
            <h2 className="text-center mb-3">SIGNUP</h2>
            <div class="form-outline mb-4">
              <input
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                id="form2Example1"
                class="form-control"
                placeholder="Name"
              />
            </div>
            <div class="form-outline mb-4">
              <input
                type="email"
                value={email}
                required
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
              Sign up
            </button>

            <div class="text-center">
              <p>
                Have an account? <NavLink to="/login">Login</NavLink>
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

export default Signup;
