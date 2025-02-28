import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfPicDef from "/Users/apple/Desktop/Real Estate Project/client/src/assets/sdfe.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-amber-800 shadow-2xl">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4 relative">
        <small className="hidden lg:inline mr-5 font-semibold text-stone-300">
          {" "}
          V1.03
        </small>
        {/* Logo and Made by VIIthaG */}
        <h1 className="font-bold flex items-center text-xl cursor-default">
          <Link to="/">
            <span className="text-white">Kohi</span>
            <span className="text-amber-100">Estate</span>
          </Link>
          <Link to="https://github.com/VIIthaG">
            <small className="hidden lg:inline opacity-0 hover:opacity-90   transition-opacity duration-700 text-xs mt-4  text-amber-50 ml-2 cursor-default">
              Made by VIIthaG
            </small>
          </Link>
        </h1>

        <form
          className="bg-slate-100 p-3 rounded-lg flex items-center ml-12 lg:ml-25 mr-4  lg:mr-30"
          action=""
        >
          <input
            // className="border-1 bg-white rounded-2xl"
            className="focus outline-none w-45 lg:w-90 sm:w-64  md:32 hover:text-gray-700 "
            type="text"
            name=""
            id=""
            placeholder="  Search..."
          />
          <FaSearch className="text-slate-500"></FaSearch>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden lg:inline text-amber-50 hover:underline">
              Donate
            </li>
          </Link>
          <Link to="/">
            <li className="hidden sm:inline text-amber-50 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className=" sm:inline text-amber-50 hover:underline">About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover hover:shadow-lg"
                src={currentUser?.avatar || ProfPicDef}
                alt="profile"
              />
            ) : (
              <li className=" text-amber-50 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
