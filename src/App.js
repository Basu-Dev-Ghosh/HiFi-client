import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.js";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { authContext } from "./contexts/authContext";
import Login from "./Pages/Login/Login";
import Search from "./Pages/Search/Search";
import Profile from "./Pages/Profile/Profile";
import Signup from "./Pages/Signup/Signup";
import Home from "./Pages/Home/Home";
import AddPost from "./Pages/AddPost/AddPost";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [homeNotification, setHomeNotification] = useState(0);
  return (
    <>
      <authContext.Provider value={{isAuth,setIsAuth,homeNotification,setHomeNotification}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/addpost" element={<AddPost />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </authContext.Provider>
    </>
  );
}

export default App;
