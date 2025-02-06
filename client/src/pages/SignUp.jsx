import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto  bg-cover bg-center bg-no-repeat">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex gap-3 flex-col">
        <input
          type="text"
          placeholder="username"
          className="border border-gray-200 p-3 rounded-lg bg-gray-200"
          id="username"
        />

        <input
          type="text"
          placeholder="email"
          className="border border-gray-200 p-3 rounded-lg bg-gray-200"
          id="email"
        />

        <input
          type="password"
          placeholder="password"
          className="border border-gray-200 p-3 rounded-lg bg-gray-200"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg  hover:opacity-97 disabled:opacity-80">
          Submit
        </button>
      </form>
      <div className="my-0.5 flex gap-1">
        <p>Have an Account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 hover:underline">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
