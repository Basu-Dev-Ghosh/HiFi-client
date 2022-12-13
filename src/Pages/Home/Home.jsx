import React from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar";
import { authContext } from "../../contexts/authContext";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const { setHomeNotification, isAuth } = useContext(authContext);
  const [posts, setPosts] = useState([{}]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [profileId, setProfileId] = useState("");
  const [commentText, setCommentText] = useState("");

  const isLoggedin = async () => {
    setHomeNotification(0);
    try {
      const res = await axios.get(
        "https://hifi-server.onrender.com/islogin",
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data;
        setProfileId(data.user._id);
        navigate("/");
      }
    } catch (err) {
      navigate("/login");
    }
  };
  const getPosts = async () => {
    try {
      const res = await axios.get(
        "https://hifi-server.onrender.com/getposts",
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data;
        data.posts.reverse();
        setPosts(data.posts);
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    } else {
      isLoggedin();
    }
  }, []);

  useEffect(() => {
    getPosts();
  }, []);

  const deletepost = async (id) => {
    try {
      const res = await axios.post(
        "https://hifi-server.onrender.com/deletepost",
        { id }
      );
      if (res.status === 200) {
        getPosts();
      }
    } catch (err) {
      alert(err);
    }
  };

  const like = async (id) => {
    try {
      const res = await axios.post(
        "https://hifi-server.onrender.com/like",
        { id },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        getPosts();
      }
    } catch (err) {
      alert(err);
    }
  };
  const comment = async (id) => {
    try {
      const res = await axios.post(
        "https://hifi-server.onrender.com/comment",
        { id, commentText },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        window.location.reload();
        setCommentText("");
        setShowCommentInput(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="home-container container">
        {posts.length === 0 ? (
          <h1>No Posts</h1>
        ) : (
          posts.map((post) => {
            return (
              <div className="post">
                <div className="logo">
                  <NavLink
                    class="nav-link d-sm-flex align-items-sm-center"
                    to={`/profile/${post.userid}`}
                  >
                    <img
                      src={post.userimageurl}
                      class="rounded-circle"
                      height="22"
                      alt="Black and White Portrait of a Man"
                    />
                    <strong class=" d-sm-block ms-1">{post.username}</strong>
                  </NavLink>
                  {profileId === post.userid ? (
                    <i
                      class="fa-solid fa-trash-can"
                      onClick={() => {
                        deletepost(post._id);
                      }}
                    ></i>
                  ) : null}
                </div>
                <div className="content">
                  <p>{post.content}</p>
                </div>
                <div className="img">
                  <img src={post.postimageurl} alt="" />
                </div>
                <div className="buttons">
                  {profileId === post.userid ? null : (
                    <i
                      class="fa-solid fa-face-grin-hearts"
                      onClick={() => {
                        like(post._id);
                      }}
                    ></i>
                  )}

                  <span>{post.likes} Likes</span>
                  <i
                    class="fa-solid fa-comment"
                    onClick={() => {
                      setShowCommentInput(!showCommentInput);
                    }}
                  ></i>
                  <span>{`${post.comments?.length} comments`}</span>
                </div>
                <div className="comments">
                  {post.comments?.map((comment) => {
                    return (
                      <NavLink
                        class="nav-link d-sm-flex align-items-sm-center"
                        to={`/profile/${comment.senderid}`}
                      >
                        <img
                          src={comment.senderpic}
                          class="rounded-circle"
                          height="22"
                          alt=""
                        />
                        <strong class=" d-sm-block ms-1 comment-text">
                          {comment.text}
                        </strong>
                      </NavLink>
                    );
                  })}
                </div>
                {showCommentInput && (
                  <div className="comments-input">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="comment-input"
                      placeholder="Comment here"
                    />
                    <i
                      class="fa-solid fa-paper-plane comment-button"
                      onClick={() => comment(post._id)}
                    ></i>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
