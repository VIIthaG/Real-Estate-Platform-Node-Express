import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className="bg-amber-800 shadow-2xl">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-white"> Kohi </span>
            <span className="text-amber-100"> Estate</span>
          </h1>
        </Link>
        <form
          className="bg-slate-100 p-3 rounded-lg flex items-center ml-14"
          action=""
        >
          <input
            // className="border-1 bg-white rounded-2xl"
            className="focus outline-none w-45 lg:w-90 sm:w-64 md:32"
            type="text"
            name=""
            id=""
            placeholder="  Search..."
          />
          <FaSearch className="text-slate-500"></FaSearch>
        </form>
        <ul className="flex gap-4">
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
                className="rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline"> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
