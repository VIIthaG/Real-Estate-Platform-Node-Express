import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/updateListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Cookies from "./components/Cookies";
import Terms from "./pages/Terms";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {/* //SUSSY the main and the divs were not originally there and are here  to make the footer work*/}
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />

            <Route path="cookiepolicy" element={<Cookies />} />
            <Route path="/search" element={<Search />} />
            <Route element={<PrivateRoute />}>
              <Route path="/createlisting" element={<CreateListing />} />

              <Route
                path="/updatelisting/:listingId"
                element={<UpdateListing />}
              />

              <Route path="/profile" element={<Profile />} />
            </Route>

            <Route element={<Listing />} path="/listing/:listingId" />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
