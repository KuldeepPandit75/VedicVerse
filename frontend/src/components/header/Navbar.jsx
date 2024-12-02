import React from "react";

const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center px-6 py-4">
      <h1 className="text-[#A41623] text-4xl font-bold font-samarkan">
        Vedic Verse
      </h1>

      <ul className="flex justify-around bg-[#A41623BF] rounded-2xl w-[506px]">
        <li className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer">
          Home
        </li>
        <li className="text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer">
          Introduction
        </li>
        <li className=" text-[#FFB563] text-2xl font-medium hover:text-red-400 cursor-pointer">
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
