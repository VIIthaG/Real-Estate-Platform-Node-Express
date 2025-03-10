import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";
import ad from "../assets/ad.jpg";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch(signInFailure(null));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="my-10 ">
      <div className="flex justify-center">
        <div className="shadow-lg w-34 flex justify-center text-center p-1 font-semibold text-amber-100 text-3xl rounded">
          Sign In
        </div>
      </div>
      <div className="p-3 max-w-lg mx-auto bg-cover bg-center bg-no-repeat">
        <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            className="border border-gray-200 p-3 rounded-lg bg-gray-200 hover:text-gray-700"
            id="email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="password"
            className="border border-gray-200 p-3 rounded-lg bg-gray-200 hover:text-gray-700"
            id="password"
            onChange={handleChange}
            required
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
        <div className="my-0.5 flex gap-1 mt-5">
          <p>No Account?</p>
          <Link to={"/signup"}>
            <span className="text-amber-100 hover:underline">Sign Up</span>
          </Link>

          <div className="ml-30 flex gap-2">
            <p>Like What You See?</p>
            <Link to={"https://github.com/VIIthaG"}>
              <span className="text-amber-100 hover:underline">Rate Us</span>
            </Link>
          </div>
        </div>
        {error && <p className="text-red-700">{error}</p>}
      </div>
      <Link
        to="https://www.apple.com/in/"
        className="flex justify-center mt-15 p-7 shadow-lg"
      >
        <img src={ad} className="w-120 h-40 lg:w-150 lg:h-45" />
      </Link>
    </div>
  );
}
