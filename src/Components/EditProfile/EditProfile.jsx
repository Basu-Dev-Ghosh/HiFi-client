import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/Loader";
import "./EditProfile.css";
const EditProfile = ({ setShowEditProfile }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [about, setAbout] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isLoggedin = async () => {
    try {
      const res = await axios.get("https://hifi-server.onrender.com/islogin", {
        withCredentials: true,
      });
      if (res.status === 200) {
        const data = res.data;
        setName(data.user.name);
        setPlace(data.user.place);
        setAbout(data.user.about);
        setImageurl(data.user.imageurl);
      }
    } catch (err) {
      navigate("/login");
    }
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
      setImageurl(dat.secure_url);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert(err);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hifi-server.onrender.com/updateprofile",
        {
          name,
          place,
          about,
          imageurl,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data;
        alert(data.msg);
        navigate('/');
        setShowEditProfile(false);
      }
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container edit-profile-container">
          <div className="back-button">
            <i
              class="fa-solid fa-xmark"
              onClick={() => setShowEditProfile(false)}
            ></i>
          </div>
          <form method="POST" onSubmit={updateProfile}>
            <div class="form-outline mb-4">
              <label class="form-label" for="customFile">
                Upload Image
              </label>
              <input
                type="file"
                onChange={handleImage}
                class="form-control"
                id="customFile"
              />
            </div>
            <div class="form-outline mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="form4Example1"
                class="form-control"
                required
              />
              <label class="form-label" for="form4Example1">
                Name
              </label>
            </div>

            <div class="form-outline mb-4">
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                id="form4Example2"
                class="form-control"
                required
              />
              <label class="form-label" for="form4Example2">
                Place
              </label>
            </div>

            <div class="form-outline mb-4">
              <textarea
                class="form-control"
                id="form4Example3"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="4"
                required
              ></textarea>
              <label class="form-label" for="form4Example3">
                About
              </label>
            </div>

            <button type="submit" class="btn-primary mb-4 edit-profile-button">
              Update Profile
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditProfile;
