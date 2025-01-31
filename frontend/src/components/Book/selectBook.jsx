import React from "react";
import { useNavigate } from "react-router";
import Navbar from "../header/Navbar";

export default function SelectBook() {
  const navigate = useNavigate();

  const navToGita = () => {
    navigate("/book");
  };

  const navToBook = () => {
    navigate("/vedbooks");
  };

  return (
    <div className="min-h-screen backdrop-blur-md px-4">
      {/* Navbar at the top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content with padding to prevent overlap */}
      <div className="flex flex-col md:flex-row justify-center items-center pt-[120px] gap-10 sm:gap-12">
        {/* Library Book */}
        <div className="cursor-pointer text-center">
          <img
            className="w-[250px] h-[375px] md:w-[300px] md:h-[450px] hover:scale-105 transition-transform duration-400 rounded-lg"
            src="/cover/vedas.jpeg"
            alt="Vedas"
            onClick={navToBook}
          />
          <p className="text-center text-3xl md:text-4xl mt-3 text-[#5a040de4] font-samarkan font-semibold">
            Library
          </p>
        </div>

        {/* 2D Library Book */}
        <div className="cursor-pointer mb-6 md:mb-0 md:px-4">
          <img
            className="w-[250px] h-[375px] md:w-[300px] md:h-[450px] hover:scale-105 transition-transform duration-400 rounded-lg"
            src="/cover/vedas2.jpeg"
            alt="Gita"
            onClick={navToGita}
          />
          <p className="text-center text-3xl md:text-4xl mt-3 text-[#5a040dfa] font-samarkan font-semibold">
            2D Library
          </p>
        </div>
      </div>
    </div>
  );
}
