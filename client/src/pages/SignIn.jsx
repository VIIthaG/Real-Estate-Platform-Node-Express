import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signInStart } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { signInFailure } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // to make  sure that  we can make entries in all 3 input fields without resetting anything or losing data
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data.message));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }

  return (
    <div className="my-10">
      <div className="shadow-2xl">
        <h1 className="text-3xl text-center text-amber-100 font-semibold  my-4  ">
          Sign In
        </h1>
      </div>
      <div className="p-3  max-w-lg mx-auto  bg-cover bg-center bg-no-repeat  ">
        <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            className="border border-gray-200 p-3 rounded-lg bg-gray-200"
            id="email"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="password"
            className="border border-gray-200 p-3 rounded-lg bg-gray-200"
            id="password"
            onChange={handleChange}
          />
          <div className="flex  gap-2 justify-center">
            <button
              className="bg-amber-100 text-amber-800 p-3 rounded-lg w-48 font-semibold hover:opacity-97 disabled:opacity-80 justify-center gap-3 transition-transform duration-300 ease-in-out hover:scale-101 hover:bg-yellow-100 hover:shadow-md"
              disabled={loading}
            >
              {loading ? "Loading" : "Submit"}
            </button>
            <OAuth />
          </div>
        </form>
        <div className="my-0.5 flex gap-1 mt-5">
          <p>No Account?</p>
          <Link to={"/signup"}>
            <span className="text-amber-100 hover:underline">Sign Up</span>
          </Link>

          <div className=" ml-30 flex gap-2">
            <p>Like What You See?</p>
            <Link to={"/Rate"}>
              <span className="text-amber-100 hover:underline">Rate Us</span>
            </Link>
          </div>
        </div>
        {error && <p className="text-red-700">{error} </p>}
      </div>
    </div>
  );
}
