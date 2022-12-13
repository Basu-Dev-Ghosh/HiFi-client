import React from "react";
import { useState } from "react";
import EditProfile from "../../Components/EditProfile/EditProfile";
import Navbar from "../../Components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import "./Profile.css";
import axios from "axios";
import { auth } from "../../firebase-config";
import { useEffect } from "react";

const Profile = () => {
  const { id } = useParams();
  const [photoUrl, setPhotoUrl] = useState("");
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [photos, setPhotos] = useState();
  const [about, setAbout] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentuserid, setCurrentUserId] = useState("");

  console.log(auth);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "https://hifi-server.onrender.com/getuserbyid",
        { id },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data;
        setName(data.user.name);
        setPhotoUrl(data.user.imageurl);
        setPlace(data.user.place);
        setPhotos(data.user.photos);
        setAbout(data.user.about);
        setCurrentUserId(data.currentuserid);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getPhotos = async (id) => {
    try {
      const res = await axios.post(
        "https://hifi-server.onrender.com/getphotos",
        { id },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data;
        setPosts(data.posts);
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getUserData();
    getPhotos(id);
  }, []);

  return (
    <>
      <Navbar />
      <section class="h-100 gradient-custom-2 profile">
        {showEditProfile && (
          <EditProfile setShowEditProfile={setShowEditProfile} />
        )}
        <div class="container-fluid py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-9 col-xl-7">
              <div
                class="card profile-section"
                style={showEditProfile ? { display: "none" } : null}
              >
                <div
                  class="rounded-top text-white d-flex flex-row "
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    class="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <img
                      src={photoUrl}
                      alt="Generic placeholder image"
                      className="img-fluid img-thumbnail mt-4 profile-pic"
                    />
                    {currentuserid === id ? (
                      <>
                        <button
                          type="button"
                          class="btn-dark btn-outline-dark"
                          data-mdb-ripple-color="dark"
                          onClick={() => setShowEditProfile(true)}
                          style={{
                            zIndex: "1",
                            backgroundColor: "black",
                            color: "#fff",
                            padding: "5px",
                            border: "0",
                            borderRadius: "5px",
                          }}
                        >
                          Edit profile
                        </button>
                      </>
                    ) : (
                      <>null</>
                    )}
                  </div>
                  <div class="ms-3" style={{ marginTop: "130px" }}>
                    <h5>{name}</h5>
                    <p>{place ? place : "India"}</p>
                  </div>
                </div>
                <div
                  class="p-4 text-black"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div class="d-flex justify-content-end text-center followers">
                    <div>
                      <p class="mb-1 h5">{posts.length}</p>
                      <p class="small text-muted mb-0">Photos</p>
                    </div>
                  </div>
                </div>
                <div class="card-body mt-5 p-4 text-black">
                  <div class="mb-5">
                    <p class="lead fw-normal mb-1">About</p>
                    <div class="p-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <p class="font-italic mb-1">{about}</p>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="lead fw-normal mb-0">Recent posts</p>
                  </div>
                  <div class="row g-2">
                    {posts.map((post) => {
                      return (
                        <div class="col mb-2">
                          <img
                            src={post.postimageurl}
                            alt="image 1"
                            class="w-100 rounded-3"
                          />
                          <h3>
                            {post.likes}
                            <i class="fa-solid fa-heart"></i>
                          </h3>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
