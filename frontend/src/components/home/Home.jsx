import React, { useEffect } from "react";
// import Card from "../features/Feature";
import { useNavigate, useSearchParams } from "react-router";
import Navbar from "../header/Navbar";
import { setGameLoading } from "../../features/vedicSlice";
import { useDispatch } from "react-redux";


const Home = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();

  
  const navtoMeta = () => {
    dispatch(setGameLoading(true));

    setTimeout(()=>{

      navigate("/meta");
    },1000)
  };

  const navtoTranslate = () => {
    navigate("/translate");
  };
  const navtoBook = () => {
    navigate("/bookstype");
  };

  useEffect(()=>{
    dispatch(setGameLoading(false))
  },[])

  return (
    <div className="overflow-x-hidden relative">
      <div className="sticky z-10 top-0">
        <Navbar />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20 p-10">
        <div
          className="hover:scale-105 transition-transform duration-700 cursor-pointer"
          onClick={() => navtoBook()}
        >
          <div className="w-full max-w-sm md:w-80 h-60 backdrop-blur-[2px] bg-[#a8661cb5] rounded-t-2xl shadow-lg p-6 text-center">
            <img src="veds 1.png" alt="vedas" className="w-64 h-60 mx-auto" />
          </div>
          <div className="w-full max-w-sm md:w-80 h-64 bg-gray-700 bg-opacity-70 rounded-b-3xl font-samarkan text-center">
            <h2 className="text-[#FFB563] text-2xl md:text-3xl font-semibold p-2 font-samarkan">
              Collection of Vedas
            </h2>
            <p className="text-white text-sm md:text-base">
              Unlock the wisdom of the ages through our curated library of the
              Vedas. Explore sacred scriptures that have shaped human thought,
              philosophy, and spirituality for millennia.
            </p>
          </div>
        </div>

        <div
          className="hover:scale-105 transition-transform duration-700 cursor-pointer"
          onClick={() => navtoTranslate()}
        >
          <div className="w-full max-w-sm md:w-80 h-64 backdrop-blur-[2px] bg-[#a8661cb5] rounded-t-2xl shadow-lg p-6 text-center">
            <img src="vedvyas 1.png" alt="guru" className="w-64 h-60 mx-auto" />
          </div>
          <div className="w-full max-w-sm md:w-80 h-64 bg-gray-700 bg-opacity-70 rounded-b-3xl text-center">
            <h2 className="text-[#FFB563] text-2xl md:text-3xl font-semibold p-2 font-samarkan">
              Translate Vedic Texts
            </h2>
            <p className="text-white text-sm md:text-base">
              Bridge the gap between ancient knowledge and the modern world. Use
              our tools to translate and understand Vedic texts, preserving
              their meaning and making them accessible to everyone.
            </p>
          </div>
        </div>
        <div
          className="hover:scale-105 transition-transform duration-700 cursor-pointer"
          onClick={() => navtoMeta()}
        >
          <div className="w-full max-w-sm md:w-80 h-64 backdrop-blur-[2px] bg-[#a8661cb5] rounded-t-2xl shadow-lg p-6 text-center">
            <img src="guru.png" alt="guru" className="w-64 h-60 mx-auto" />
          </div>
          <div className="w-full max-w-sm md:w-80 h-64 bg-gray-700 bg-opacity-70 rounded-b-3xl text-center">
            <h2 className="text-[#FFB563] text-2xl md:text-3xl font-semibold p-2 font-samarkan">
              Explore Our Culture in 2D
            </h2>
            <p className="text-white text-sm md:text-base">
              Step into the timeless world of Vedic culture, brought to life in
              a captivating 2D metaverse. Discover ancient traditions, learn
              about our rich heritage, and interact with a visually immersive
              representation of Indian culture. <b>--In progress--</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
