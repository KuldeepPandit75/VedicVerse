import React from "react";

const Card = ({ image, title, description }) => {
  return (
    <>
      <div className="   w-96 h-72 bg-[#FFD29D] rounded-lg shadow-lg p-6 text-center">
        <img src={image} alt={title} className="h-20 mx-auto mb-4" />
      </div>
      <div className="  w-96 h-72 bg-gray-700 bg-opacity-70">
        <h2 className="text-[#FFB563] text-xl font-bold mb-2">{title}</h2>
        <p className="text-white">{description}</p>
      </div>
    </>
  );
};

export default Card;
