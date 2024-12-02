// src Home.jsx
import React from "react";
// import Navbar from "./compone";
// import {Feature as Card} from "./components/F"
import Card from "../features/Feature";
const Home = () => {
  return (
    <div className="min-h-screen bg-cover bg-center flex justify-evenly mt-5">
      <div className=" hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="   w-80 h-72 bg-[#FFD29D] rounded-t-2xl shadow-lg p-6 text-center">
          <img src="guru.png" alt="guru" className="w-64 h-60" />
        </div>
        <div className="  w-80 h-64 bg-gray-700 bg-opacity-70 rounded-b-3xl text-center">
          <h2 className="text-[#FFB563] text-3xl font-semibolds p-2  font-samarkan">
            Explore Our Culture in 2D
          </h2>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, eligendi.
          </p>
        </div>
      </div>
      <div className=" hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="   w-80 h-72 bg-[#FFD29D] rounded-t-2xl shadow-lg p-6 text-center">
          <img src="veds 1.png" alt="guru" className="w-64 h-60" />
        </div>
        <div className="  w-80 h-64 bg-gray-700 bg-opacity-70 rounded-b-3xl font-samarkan text-center">
          <h2 className="text-[#FFB563] text-3xl font-semibolds p-2  font-samarkan">
            Collection of vedas
          </h2>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, eligendi.
          </p>
        </div>
      </div>
      <div className=" hover:scale-105 transition-transform duration-300 cursor-pointer">
        <div className="   w-80 h-72 bg-[#FFD29D] rounded-t-2xl shadow-lg p-6 text-center">
          <img src="vedvyas 1.png" alt="guru" className="w-64 h-60" />
        </div>
        <div className="  w-80 h-64 bg-gray-700 bg-opacity-70 rounded-b-3xl  text-center">
          <h2 className="text-[#FFB563] text-3xl font-semibolds p-2  font-samarkan">
            Translate Vedic Texts{" "}
          </h2>
          <p className="text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, eligendi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
