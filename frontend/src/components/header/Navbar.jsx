import React from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();

  const navtoHome = () => {
    navigate("/");
  };

  const navtoVedas = () => {
    navigate("/bookstype");
  };
  return (
    <nav className=" flex justify-between items-center px-6 py-6">
      <h1 className="text-[#5a040dfa] text-4xl font-bold font-samarkan">
        Vedic Verse
      </h1>

      <ul className="flex justify-around items-center bg-[#5a040dbd] rounded-2xl w-[506px] h-10 -left-96">
        <li
          className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={() => navtoHome()}
        >
          Home
        </li>
        <li className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer">
          Introduction
        </li>
        <li
          className=" text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer"
          onClick={() => navtoVedas()}
        >
          Vedas
        </li>
      </ul>

      <button className=" h-10 w-10 rounded-full">
        <img src="Group 1.png" alt="User" className="" />
      </button>
    </nav>
  );
};

export default Navbar;
