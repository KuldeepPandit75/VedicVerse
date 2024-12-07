import React, { useState } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const navtoHome = () => {
    navigate("/");
  };

  const navtoVedas = () => {
    navigate("/bookstype");
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();

    console.log("Session storage cleared, user logged out");

    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-6 relative">
      <h1 className="text-[#5a040dfa] text-4xl font-bold font-samarkan">
        Vedic Verse
      </h1>

      <ul className="flex justify-around items-center bg-[#5a040dbd] rounded-2xl w-[506px] h-10 -left-96">
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={navtoHome}
        >
          Home
        </li>
        <li className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer">
          Introduction
        </li>
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={navtoVedas}
        >
          Vedas
        </li>
      </ul>

      <div className="relative">
        <button
          className="h-10 w-10 rounded-full"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          <img src="Group 1.png" alt="User" className="h-full w-full" />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-32">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
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
