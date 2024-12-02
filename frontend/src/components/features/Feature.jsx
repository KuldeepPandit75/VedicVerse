// src/components/Card.jsx
import React from "react";

const Card = ({ image, title, description }) => {
  return (
    <div className="bg-white bg-opacity-70 rounded-lg shadow-lg p-6 text-center">
      <img src={image} alt={title} className="h-20 mx-auto mb-4" />
      <h2 className="text-red-600 text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  );
};

export default Card;
