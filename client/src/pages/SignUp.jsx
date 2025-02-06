import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value, // to make  sure that  we can make entries in all 3 input fields without resetting anything or losing data
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
      console.log(data);
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
    <div className="p-3 max-w-lg mx-auto  bg-cover bg-center bg-no-repeat">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex gap-3 flex-col" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          className="border border-gray-200 p-3 rounded-lg bg-gray-200"
          id="username"
          onChange={handleChange}
        />

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
        <button
          className="bg-slate-700 text-white p-3 rounded-lg  hover:opacity-97 disabled:opacity-80"
          disabled={loading}
        >
          {loading ? "Loading" : "Submit"}
        </button>
      </form>
      <div className="my-0.5 flex gap-1 mt-5">
        <p>Have an Account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700 hover:underline">Sign In</span>
        </Link>
      </div>
      {error && <p className="text-red-700">{error} </p>}
    </div>
  );
}
