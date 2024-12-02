import React from "react";
import Navbar from "../header/Navbar";
import { useNavigate } from "react-router";

export default function VedBooks() {
  const navigate = useNavigate();

  const navtobook=()=>{
    navigate("/book")
  }
  return (
    <div className="min-h-screen backdrop-blur-[10px]">
      <Navbar />
      <div className="p-8 backdrop-blur-lg h-screen overflow-y-auto m-3">
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <li className="w-full hover:scale-105  cursor-pointer">
            <img
              src="/gita.jpg" 
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg shadow-md"
              onClick={()=>navtobook()}
            />
          </li>
          <li className="w-full  hover:scale-105 cursor-pointer ">
            <img
              src="/book3.jpeg" 
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </li>
          <li className="w-full hover:scale-105 cursor-pointer ">
            <img
              src="/book2.jpeg"
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </li>
          <li className="w-full hover:scale-105  cursor-pointer">
            <img
              src="/book4.jpeg"
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </li>
          <li className="w-full  hover:scale-105  cursor-pointer">
            <img
              src="/book5.jpeg" 
              alt="Book Cover"
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
