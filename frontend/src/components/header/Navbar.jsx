// src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-transparent flex justify-between items-center px-8 py-4">
      <h1 className="text-red-600 text-2xl font-bold">Vedic Verse</h1>
      <ul className="flex space-x-8">
        <li className="text-white font-semibold hover:text-red-400">Home</li>
        <li className="text-white font-semibold hover:text-red-400">
          Introduction
        </li>
        <li className="text-white font-semibold hover:text-red-400">Vedas</li>
      </ul>
    </nav>
  );
};

export default Navbar;
