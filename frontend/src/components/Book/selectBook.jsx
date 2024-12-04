import React from "react";
import { useNavigate } from "react-router";

export default function selectBook() {
  const navigate = useNavigate();

  const navtogita = () => {
    navigate("/book");
  };
  const navtoBook = () => {
    navigate("/vedbooks");
  };
  return (
    <div className="flex justify-evenly items-center  min-h-screen min-w-full backdrop-blur-md">
      <div className="cursor-pointer ">
        <img
          className="w-[300px] h-[450px] hover:scale-105 transition-transform duration-400 rounded-lg"
          src="/cover/vedas.jpeg"
          alt="error"
          onClick={() => navtoBook()}
        />
        <p className="text-center text-4xl mt-3 text-[#5a040de4] font-samarkan font-semibold">
          Library
        </p>
      </div>
      <div className="cursor-pointer ">
        <img
          className="w-[300px] h-[450px] hover:scale-105 transition-transform duration-400 rounded-lg"
          src="/cover/vedas2.jpeg"
          alt="error"
          onClick={() => navtogita()}
        />
        <p className="text-center text-4xl mt-3 text-[#5a040dfa] font-samarkan font-semibold">
          2D Library
        </p>
      </div>
    </div>
  );
}
