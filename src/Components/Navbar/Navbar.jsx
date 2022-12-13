import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import axios from "axios";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [imageurl, setImageurl] = useState("");
  const [userid, setUserid] = useState('');

  const { isAuth, setIsAuth, homeNotification } = useContext(authContext);

  const isLoggedin = async () => {
    try {
      const res = await axios.get("https://hifi-server.onrender.com//islogin", {
        withCredentials: true,
      });
      if (res.status === 200) {
        const data = res.data;
        setUserid(data.user._id);
        setImageurl(data.user.imageurl);
      }
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate('/')
    } else {
      isLoggedin();
    }
  }, []);

  const logout = async () => {
    if (isAuth) {
      signOut(auth).then((res) => {
        setIsAuth(false);
        localStorage.clear();
      });
      try {
        const res = await axios.get("https://hifi-server.onrender.com/logout", {
          withCredentials: true,
        });
        if (res.status === 200) {
          alert("Logout Successfull");
          navigate("/login");
        }
      } catch (err) {
        alert(err);
      }
    } else {
      try {
        const res = await axios.get("https://hifi-server.onrender.com/logout", {
          withCredentials: true,
        });
        if (res.status === 200) {
          alert("Logout Successfull");
          navigate("/login");
        }
      } catch (err) {
        alert(err);
      }
    }
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid justify-content-between">
          <div class="d-flex align-items-center">
            <a
              class="navbar-brand me-2 mb-1 d-flex align-items-center"
              href="#"
            >
              <h3 className="heading">HiFi</h3>
            </a>
          </div>

          <ul class="navbar-nav flex-row d-md-flex navbar-phone">
            <li class="nav-item me-3 me-lg-1 active">
              <NavLink class="nav-link" to="/">
                <span>
                  <i class="fas fa-home fa-lg"></i>
                </span>
                <span class="badge rounded-pill badge-notification bg-danger">
                  {homeNotification === 0 ? null : homeNotification}
                </span>
              </NavLink>
            </li>

            <li class="nav-item me-3 me-lg-1">
              <NavLink class="nav-link" to="/search">
                <span>
                  <i class="fa-solid fa-magnifying-glass"></i>
                </span>
              </NavLink>
            </li>
            <li class="nav-item me-3 me-lg-1">
              <NavLink class="nav-link" to="/addpost">
                <span>
                  <i class="fas fa-plus-circle fa-lg"></i>
                </span>
              </NavLink>
            </li>
            <li class="nav-item me-3 me-lg-1">
              <NavLink
                class="nav-link d-sm-flex align-items-sm-center navlink-profile"
                to={`/profile/${userid}`}
              >
                <img
                  src={imageurl}
                  class="rounded-circle"
                  height="27"
                  style={{ width: "25px" }}
                />
              </NavLink>
            </li>
            <li class="nav-item me-3 me-lg-1">
              <a class="nav-link" onClick={logout}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
