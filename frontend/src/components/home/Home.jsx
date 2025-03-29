import React from "react";
// import Card from "../features/Feature";
import { useNavigate } from "react-router";
import Navbar from "../header/Navbar";

const Home = () => {
  const navigate = useNavigate();

  const navtoMeta = () => {
    navigate("/meta");
  };
  const navtoTranslate = () => {
    navigate("/translate");
  };
  const navtoBook = () => {
    navigate("/bookstype");
  };
  const navtoShop = () => {
    navigate("/shop");
  };
  const navtoPanditBooking = () => {
    navigate("/pandit-booking");
  };

  return (
    <>
      <div className="sticky top-0 z-10">
        <Navbar />
      </div>
      <div className="flex flex-wrap items-center justify-center min-h-screen gap-10 p-4 md:flex-row md:gap-20">
        <div
          className="transition-transform duration-700 cursor-pointer hover:scale-105"
          onClick={() => navtoBook()}
        >
          <div className="w-full max-w-sm md:w-80 h-64 backdrop-blur-[2px] bg-[#a8661cb5] rounded-t-2xl shadow-lg p-6 text-center">
            <img src="veds 1.png" alt="vedas" className="w-64 mx-auto h-60" />
          </div>
          <div className="w-full h-64 max-w-sm text-center bg-gray-700 md:w-80 bg-opacity-70 rounded-b-3xl font-samarkan">
            <h2 className="text-[#FFB563] text-2xl md:text-3xl font-semibold p-2 font-samarkan">
              Collection of Vedas
            </h2>
            <p className="text-sm text-white md:text-base">
              Unlock the wisdom of the ages through our curated library of the
              Vedas. Explore sacred scriptures that have shaped human thought,
              philosophy, and spirituality for millennia.
            </p>
          </div>
        </div>

        <div
          className="transition-transform duration-700 cursor-pointer hover:scale-105"
          onClick={() => navtoTranslate()}
        >
          <div className="w-full max-w-sm md:w-80 h-64 backdrop-blur-[2px] bg-[#a8661cb5] rounded-t-2xl shadow-lg p-6 text-center">
            <img src="vedvyas 1.png" alt="guru" className="w-64 mx-auto h-60" />
          </div>
          <div className="w-full h-64 max-w-sm text-center bg-gray-700 md:w-80 bg-opacity-70 rounded-b-3xl">
            <h2 className="text-[#FFB563] text-2xl md:text-3xl font-semibold p-2 font-samarkan">
              Translate Vedic Texts
            </h2>
            <p className="text-sm text-white md:text-base">
              Bridge the gap between ancient knowledge and the modern world. Use
              our tools to translate and understand Vedic texts, preserving
              their meaning and making them accessible to everyone.
            </p>
          </div>
        </div>
        <div
          className="transition-transform duration-700 cursor-pointer hover:scale-105"
          onClick={() => navtoMeta()}
        >
          <div className="w-full max-w-sm md:w-80 h-64 backdrop-blur-[2px] bg-[#a8661cb5] rounded-t-2xl shadow-lg p-6 text-center">
            <img src="guru.png" alt="guru" className="w-64 mx-auto h-60" />
          </div>
          <div className="w-full h-64 max-w-sm text-center bg-gray-700 md:w-80 bg-opacity-70 rounded-b-3xl">
            <h2 className="text-[#FFB563] text-2xl md:text-3xl font-semibold p-2 font-samarkan">
              Explore Our Culture in 2D
            </h2>
            <p className="text-sm text-white md:text-base">
              Step into the timeless world of Vedic culture, brought to life in
              a captivating 2D metaverse. Discover ancient traditions, learn
              about our rich heritage, and interact with a visually immersive
              representation of Indian culture. <b>--In progress--</b>
            </p>
          </div>
        </div>

        {/* // Add a new card similar to your existing ones */}



<div
  className="transition-transform duration-700 cursor-pointer hover:scale-105"
  onClick={() => navtoShop()}
>
  <div className="w-full max-w-sm md:w-80 h-64 backdrop-blur-[2px] bg-[#a8661cb5] rounded-t-2xl shadow-lg p-6 text-center">
    <img src="marketplace.png" alt="marketplace" className="w-64 mx-auto h-60" />
  </div>
  <div className="w-full h-64 max-w-sm text-center bg-gray-700 md:w-80 bg-opacity-70 rounded-b-3xl">
    <h2 className="text-[#FFB563] text-2xl md:text-3xl font-semibold p-2 font-samarkan">
      Sacred Marketplace
    </h2>
    <p className="text-sm text-white md:text-base">
      Explore our collection of authentic Vedic artifacts and ritual items. 
      Browse traditional malas, yantras, and altar pieces or create your own 
      custom sacred items crafted by skilled artisans.
    </p>
  </div>
</div>

<div
  className="transition-transform duration-700 cursor-pointer hover:scale-105"
  onClick={() => navtoPanditBooking()}
>
  <div className="w-full max-w-sm md:w-80 h-64 backdrop-blur-[2px] bg-[#a8661cb5] rounded-t-2xl shadow-lg p-6 text-center">
    <img src="pandit_booking.png" alt="Pandit Booking" className="w-64 mx-auto h-60" />
  </div>
  <div className="w-full h-64 max-w-sm text-center bg-gray-700 md:w-80 bg-opacity-70 rounded-b-3xl">
    <h2 className="text-[#FFB563] text-2xl md:text-3xl font-semibold p-2 font-samarkan">
      Book a Vedic Pandit
    </h2>
    <p className="text-sm text-white md:text-base">
      Connect with experienced pandits for authentic Vedic ceremonies. Book virtual 
      or in-person rituals for house warmings, weddings, naming ceremonies, 
      and daily pujas with knowledgeable practitioners.
    </p>
  </div>
</div>


      </div>




    </>
  );
};

export default Home;
