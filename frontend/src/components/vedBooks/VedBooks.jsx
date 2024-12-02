import React from "react";
import Navbar from "../header/Navbar";

export default function VedBooks() {
  return (
    <div className="min-h-screen backdrop-blur-[10px]">
      <Navbar />
      <div className="p-8 backdrop-blur-lg h-screen overflow-y-auto m-3">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <li className="w-full hover:scale-105  cursor-pointer">
            <img
              src="/gita.jpg" // Ensure gita.jpg is in the public folder
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </li>
          <li className="w-full  hover:scale-105 cursor-pointer ">
            <img
              src="/book3.jpeg" // Ensure gita.jpg is in the public folder
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </li>
          <li className="w-full hover:scale-105 cursor-pointer ">
            <img
              src="/book2.jpeg" // Ensure gita.jpg is in the public folder
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </li>
          <li className="w-full hover:scale-105  cursor-pointer">
            <img
              src="/book4.jpeg" // Ensure gita.jpg is in the public folder
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </li>
          <li className="w-full  hover:scale-105  cursor-pointer">
            <img
              src="/book5.jpeg" // Ensure gita.jpg is in the public folder
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
