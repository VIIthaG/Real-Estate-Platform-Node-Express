import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import ProfPicDef from "/Users/apple/Desktop/Real Estate Project/client/src/assets/sdfe.png";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const [file, setFile] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = `${new Date().getTime()}_${file.name}`; // ✅ Fixed incorrect filename generation
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
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
        });
      }
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold text-center my-5 shadow-2xl ">
        <span className="text-amber-100 text-3xl font-bold">
          Hi! &nbsp; &nbsp;
        </span>
        <span className="text-4xl text-amber-50 font-bold">
          {currentUser.username}
        </span>
      </h1>

      <div className="flex justify-center">
        <input
          type="file"
          ref={fileRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])} // ✅ Fixed incorrect `onChange` placement
        />
      </div>

      <form className="flex flex-col items-center">
        <div className="bg-yellow-100  p-2 rounded-lg ">
          <div className="bg-white">
            <img
              title="Click to Change"
              onClick={() => fileRef.current.click()} // ✅ Clicking image triggers file selection
              src={formData.avatar || currentUser?.avatar}
              className="rounded-lg h-40 w-40  object-cover cursor-pointer "
              alt="Profile"
            />
          </div>
        </div>

        {/* File Upload Status */}
        <p className="p-2">
          {fileUploadError ? (
            <span className="text-red-500 shadow-lg">
              Image Size must be Less Than 2MB
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-green-500">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-amber-50 font-semibold shadow-lg">
              Avatar Updated
            </span>
          ) : null}
        </p>

        <input
          type="text"
          placeholder="Username"
          className="bg-gray-200 p-3 rounded-lg w-104 mb-3 hover:text-gray-700"
        />
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-200 p-3 rounded-lg w-104 mb-3 hover:text-gray-700"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-200 p-3 rounded-lg w-104 hover:text-gray-700 "
        />

        <button className="mt-4 ml-3 p-3 w-50 rounded-lg text-amber-800 transition-transform hover:scale-101 hover:shadow-md font-semibold bg-amber-100">
          Update
        </button>

        <div className="flex justify-between text-amber-800 font-semibold  cursor-pointer mt-4 w-109">
          <span className="hover:underline  hover:text-red-600 ">
            Delete Account
          </span>
          <span className="hover:underline  hover:text-red-600 text-amber-800">
            Sign Out
          </span>
        </div>
      </form>
    </div>
  );
}
