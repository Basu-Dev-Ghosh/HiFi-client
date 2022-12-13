import React from "react";
import "./AddPost.css";
import Navbar from "../../Components/Navbar/Navbar";
import { authContext } from "../../contexts/authContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Loader from "../../Components/Loader/Loader";
const AddPost = () => {
  const { setHomeNotification } = useContext(authContext);
  const [imageurl, setImageurl] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [postimageurl, setPostimageurl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedin = async () => {
    try {
      const res = await axios.get("https://hifi-server.onrender.com/islogin", {
        withCredentials: true,
      });
      if (res.status === 200) {
        const data = res.data;
        setImageurl(data.user.imageurl);
        setName(data.user.name);
      }
    } catch (err) { }
  };

  useEffect(() => {
    isLoggedin();
  }, []);

  const handleImage = async (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", "hifiapp");
    data.append("cloud_name", "basustudent");
    try {
      setIsLoading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/basustudent/image/upload",
        data
      );
      const dat = res.data;
      setPostimageurl(dat.secure_url);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  const createPost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hifi-server.onrender.com/createpost",
        {
          content,
          postimageurl,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data;
        setContent("");
        setPostimageurl("");
        setHomeNotification((homeNotificatiom) => {
          return homeNotificatiom + 1;
        });
        alert(data.msg);
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="addpost-container">
          <div className="addpost-form">
            <div className="addpost-header">
              <h4>Create post</h4>
              <i class="fa-solid fa-xmark"></i>
            </div>
            <div className="addpost-body">
              <div className="addpost-profile">
                <a class="nav-link d-sm-flex align-items-sm-center" href="#">
                  <img
                    src={imageurl}
                    class="rounded-circle"
                    height="22"
                    alt="Black and White Portrait of a Man"
                  />
                  <strong class=" d-sm-block ms-1">{name}</strong>
                </a>
              </div>
              <form method="POST" onSubmit={createPost}>
                <div className="text-input">
                  <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What are you thinking ?"
                  />
                </div>
                <div className="image-input">
                  <label htmlFor="image">
                    <i class="fa-solid fa-images"></i>
                  </label>
                  <input type="file" onChange={handleImage} id="image" />
                </div>
                <div className="preview-image">
                  <img src={postimageurl} alt="Post" />
                </div>
                <div className="submit-button">
                  <button className="btn btn-primary" type="submit">
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPost;
