import React from "react";
import "./Search.css";
import Navbar from "../../Components/Navbar/Navbar";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
const Search = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState([

  ]);
  const searchUser = async () => {
    try {
      const res = await axios.post("https://hifi-server.onrender.com/searchuser", {
        name,
      });
      if (res.status === 200) {
        const data = res.data;
        setUsers(data.users);
        console.log(data.users)
      }
    } catch (err) {
      alert(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="search-container container">
        <div className="search-input">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <i class="fa-solid fa-magnifying-glass" onClick={searchUser}></i>
        </div>
        <div className="search-result">
          {users.length === 0 ? <h1>No result found</h1> : users?.map((user) => {
            return (
              <>
                <div className="logo" key={user._id}>
                  <NavLink
                    class="nav-link d-sm-flex align-items-sm-center"
                    to={`/profile/${user._id}`}
                  >
                    <img
                      src={user.imageurl}
                      class="rounded-circle"
                      height="22"
                      alt=""
                    />
                    <strong class=" d-sm-block ms-1">{user.name}</strong>
                  </NavLink>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Search;
