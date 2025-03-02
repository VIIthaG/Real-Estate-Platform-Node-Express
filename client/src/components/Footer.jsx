import React from "react";
import { FaEdit, FaFacebook, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa";

function Footer() {
  return (
    <footer>
      <div className="shadow-lg shadow-black/50 -mt-2">
        <div className="p-5 bg-stone-600 flex justify-between text-stone-300 ">
          <div className="flex font-semibold items-center space-x-4 ">
            <span>Find us on:</span>
            <Link to="https://x.com">
              <FaTwitter className="mt-1" />
            </Link>
            <Link to="https://www.instagram.com">
              <FaInstagram className="mt-1" />
            </Link>
            <Link to="https://www.discord.com">
              <FaDiscord className="mt-1" />
            </Link>
            <Link to="https://www.snapchat.com">
              <FaSnapchat className="mt-1" />
            </Link>
            <Link to="https://www.snapchat.com">
              <FaFacebook className="mt-1" />
            </Link>
            &nbsp; &nbsp; &nbsp;
            <p className="hidden lg:inline mt-1 font-normal">
              © 2025 KohiEstate. All rights reserved.
            </p>
          </div>

          <div className="flex  space-x-4 mt-2">
            <Link to="abc.com" className="hover:underline ">
              Privacy Policy
            </Link>
            <Link to="abc.com" className="hover:underline">
              Cookie Policy
            </Link>
            <Link to="abc.com" className="hidden md:block hover:underline">
              Sitemap
            </Link>
            <Link to="abc.com" className="hidden lg:block hover:underline">
              Website Feedback
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
