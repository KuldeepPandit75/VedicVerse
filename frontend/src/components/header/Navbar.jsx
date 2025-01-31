import React, { useState } from "react";
import { useNavigate } from "react-router";
import { TiThMenu } from "react-icons/ti";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const navToHome = () => navigate("/");
  const navToVedas = () => navigate("/bookstype");
  const navToIntro = () => navigate("/intro");
  const navToQuiz = () => navigate("/quiz");

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    console.log("Session storage cleared, user logged out");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-6 relative backdrop-blur-[4px] rounded-b-xl">
      {/* Brand Name */}
      <h1 className="text-[#5a040dfa] text-4xl font-black font-samarkan ">
        Vedic Verse
      </h1>

      {/* Navigation Links */}
      <ul
        className={`absolute left-0 bg-[#5a040dbd] rounded-2xl text-center w-full p-6  md:absoult md:left-[410px] md:flex md:justify-evenly md:p-1 md:w-[506px] transition-all duration-500 ${
          showMenu ? "top-[80px]" : "top-[-400px]"
        } md:top-6`}
      >
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={() => navToHome()}
        >
          Home
        </li>
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={() => navToIntro()}
        >
          Introduction
        </li>
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={() => navToVedas()}
        >
          Vedas
        </li>
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={() => navToQuiz()}
        >
          Quiz
        </li>
        <li
          className={`md:hidden text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointers`}
          onClick={() => handleLogout()}
        >
          Logout
        </li>
      </ul>

      {/* Hamburger Menu for Mobile */}
      <button
        onClick={() => setShowMenu((prev) => !prev)}
        className="md:hidden block p-2 absolute right-6"
        aria-label="Toggle menu"
      >
        <TiThMenu className="h-8 w-8" />
      </button>

      {/* User Avatar and Dropdown */}
      <div className="relative">
        <button
          className="h-10 w-10 rounded-full hidden md:block"
          onClick={() => setShowDropdown((prev) => !prev)}
          aria-label="User menu"
        >
          <img src="Group 1.png" alt="User" className="h-full w-full" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-32">
            <button
              onClick={handleLogout}
              className="block w-full text-center text-xl px-4 py-2 text-red-500 bg-[#ebac65] rounded-lg hover:bg-[#e59943] transition-all duration-300"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
