import React from "react";
import { useSelector } from "react-redux";
import ProfPicDef from "/Users/apple/Desktop/Real Estate Project/client/src/assets/sdfe.png";
// import "../vg.css";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg">
      <h1 className="text-3xl font-semibold text-center my-7 text-amber-100 shadow-2xl">
        Hi ! &nbsp; &nbsp; "
        <span className="text-4xl">{currentUser.username}</span>"
      </h1>
      <form className="flex justify-center">
        <img
          src={currentUser?.avatar || ProfPicDef}
          alt="User Avatar"
          className="rounded-lg h-40 b-24 object-cover cursor-pointer"
        />
      </form>
    </div>
  );
}
