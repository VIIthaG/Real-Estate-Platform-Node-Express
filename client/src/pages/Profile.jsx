import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfPicDef from "../assets/sdfe.png";
import { FaTrash, FaTrashAlt } from "react-icons/fa";
import { FaEdit, FaFacebook, FaTwitter } from "react-icons/fa";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
} from "../redux/user/userSlice";
import { Link } from "react-router-dom";

export default function Profile() {
  const dispatch = useDispatch();
  const fileRef = useRef(null);

  const [file, setFile] = useState(null);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [filePerc, setFilePerc] = useState(0);
  const [] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    password: "",
    avatar: currentUser?.avatar || ProfPicDef,
  });

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error("Upload error:", error);
        setFileUploadError(true);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData((prev) => ({ ...prev, avatar: downloadURL }));
      }
    );
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST", //SUSSY might wanna change to put bc gpt said so
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update profile");
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="p-6 ">
      <div className="flex justify-center ">
        <h1 className="text-3xl font-semibold text-center my-5 w-64  shadow-lg">
          <span className="text-amber-100 text-3xl font-bold">
            Hi! &nbsp;&nbsp;
          </span>
          <span className="text-4xl text-amber-50 font-bold">
            "{currentUser.username}"
          </span>
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="bg-stone-400   p-1 rounded-lg">
          <div className="bg-stone-300">
            <img
              title="Click to Change"
              onClick={() => fileRef.current.click()}
              src={formData.avatar}
              onLoad={(e) => e.target.classList.remove("opacity-0")}
              className=" h-40  opacity-0 transition-opacity duration-500 w-40 object-cover cursor-pointer"
              alt="Profile"
            />
          </div>
        </div>
        <p className="p-2">
          {fileUploadError ? (
            <span className="text-red-500 shadow-lg">
              Image Size must be Less Than 2MB
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-500">{`Uploading ${filePerc}%`}</span>
          ) : null}
        </p>
        <input
          type="text"
          id="username"
          placeholder="Change Username..."
          className="bg-gray-200 p-3 rounded-lg w-104 mb-3 hover:text-gray-700"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Change Email..."
          className="bg-gray-200 p-3 rounded-lg w-104 mb-3 hover:text-gray-700"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Change Password..."
          className="bg-gray-200 p-3 rounded-lg w-104 hover:text-gray-700"
          value={formData.password}
          onChange={handleChange}
        />
        <div className="flex justify-center mr-2">
          <button
            disabled={loading}
            className="mt-4  hover:bg-yellow-100  hover:cursor-pointer ml-3 p-3 w-50 rounded-lg text-amber-800 transition-transform hover:scale-101 hover:shadow-md font-semibold bg-amber-100"
          >
            {loading ? "Loading..." : "Update"}
          </button>
          <Link
            to={"/createlisting"} //SUSSY
            className="mt-4 hover:bg-yellow-100 hover:cursor-pointer ml-3 p-3 w-50 rounded-lg text-amber-800 transition-transform hover:scale-101 hover:shadow-md font-semibold bg-amber-100 text-center"
          >
            Create Listing
          </Link>
        </div>
      </form>

      <div className="flex justify-center ">
        <div className="flex justify-between text-amber-800 font-semibold cursor-pointer mt-4 w-109">
          <span
            onClick={handleDeleteUser}
            className="hover:underline hover:text-red-600"
          >
            Delete Account
          </span>
          <small className="mr-10 w-26 text-center cursor-pointer text-white p-1 font-semibold  hover:shadow-md hover:scale-101 transition-transform hover:bg-stone-800  bg-stone-700 rounded-lg">
            <button onClick={handleShowListings} className="cursor-pointer">
              {" "}
              Show Listings
            </button>
          </small>
          <span
            onClick={handleSignOut}
            className="hover:underline hover:text-red-600 text-amber-800"
          >
            Sign Out
          </span>
        </div>
      </div>
      <div className="flex justify-center">
        <p className="text-red-500">{error ? error : ""}</p>
        {/* <p className="text-amber-50 font-semibold shadow-lg rounded p-1">
          {updateSuccess ? "Updated " : ""}
        </p> */}
        <p className="text-red-500">
          {showListingsError ? "Error Showing User Listings" : ""}
        </p>
      </div>

      <div className="justify-center  flex">
        <div className="flex max-w-130  justify-evenly mt-5 ">
          {userListings &&
            userListings.length > 0 &&
            userListings.map((listing) => {
              return (
                <div className="w-14 h-14 m-1 mb-5 " key={listing._id}>
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing"
                      className="w-full h-full object-cover rounded-lg opacity-0 transition-opacity duration-500"
                      onLoad={(e) => e.target.classList.remove("opacity-0")}
                    />
                  </Link>

                  <div className="flex mt-1 justify-evenly">
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="hover:cursor-pointer"
                    >
                      <FaTrash className="text-red-400" />
                    </button>

                    <button className="hover:cursor-pointer">
                      <FaEdit className="text-green-600" />
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
