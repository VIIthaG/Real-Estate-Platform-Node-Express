import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import ad from "/Users/apple/Desktop/Real Estate Project/client/src/assets/ad.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // to make sure that we can make entries in all 3 input fields without resetting anything or losing data
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": " application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className="my-10">
      <div className="flex justify-center">
        <div className="shadow-lg w-auto h-15 rounded ">
          <h1 className="text-3xl text-center text-amber-100 font-semibold my-5   ">
            Sign Up
          </h1>
        </div>
      </div>
      <div className="p-3 max-w-lg mx-auto bg-cover bg-center bg-no-repeat ">
        <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            className="border border-gray-200 p-3 rounded-lg bg-gray-200 hover:text-gray-700"
            id="username"
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="email"
            className="border border-gray-200 p-3 rounded-lg bg-gray-200 hover:text-gray-700"
            id="email"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="password"
            className="border border-gray-200 p-3 rounded-lg bg-gray-200 hover:text-gray-700"
            id="password"
            onChange={handleChange}
          />
          <div className="flex gap-2 justify-center">
            <button
              className="bg-amber-100 text-amber-800 p-3 rounded-lg w-48 font-semibold hover:opacity-97 disabled:opacity-80 justify-center gap-3 transition-transform duration-300 ease-in-out hover:scale-101 hover:bg-yellow-100 hover:shadow-md"
              disabled={loading}
            >
              {loading ? "Loading" : "Submit"}
            </button>
            <OAuth />
          </div>
        </form>
        <div className="my-0.5 flex justify-between gap-2 mt-5 ">
          <div className="flex gap-2 ">
            <p>Have an Account?</p>
            <Link to={"/signin"}>
              <span className="text-amber-100 hover:underline ">Sign In</span>
            </Link>
          </div>
          <div className="flex gap-2">
            <p>Like What You See?</p>
            <Link to={"https://github.com/VIIthaG"}>
              <span className="text-amber-100 hover:underline">Rate Us</span>
            </Link>
          </div>
        </div>
        {error && (
          <p className="text-red-700 flex justify-center my-3">{error} </p>
        )}
      </div>
      <Link
        to="https://www.apple.com/in/"
        className="flex justify-center mt-4 p-5 shadow-lg"
      >
        <img src={ad} className="w-120 h-40 lg:w-150 lg:h-45 " />
      </Link>
    </div>
  );
}
