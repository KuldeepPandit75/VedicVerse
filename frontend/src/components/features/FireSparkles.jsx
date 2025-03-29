import React from "react";

export default function FireSparkles() {
  return (
    <div className=" relative">
      <video
        muted
        autoPlay
        loop
        src="https://res.cloudinary.com/kuldeepcloudinary/video/upload/v1743241635/sparks_ll6lqv.mp4"
        style={{ width: "100%", height: "auto" }}
      ></video>
      <h1 className=" absolute text-[#c2783c] font-samarkan top-1/3 left-1/3 text-5xl font-black  animate-fade-in">
        Vyasa and Ganesha :
      </h1>
      <h4 className="absolute text-[#c2783c] top-[300px] left-[500px] text-3xl  animate-fade-in">
        The Untold Story of the Mahabharata's Creation :-
      </h4>
      <p className="absolute text-[#c2783c] top-[600px] left-[450px] text-3xl animate-fade-in">
        Use HeadPhone for better experience{" "}
      </p>
    </div>
  );
}
