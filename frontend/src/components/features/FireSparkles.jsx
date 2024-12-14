import React, { useEffect } from "react";

const FireSparkles = ({ onComplete }) => {
  useEffect(() => {
    // Play the fire sparkle animation here (this can be a CSS animation or a video)

    // Automatically call onComplete after 5 seconds
    const timeout = setTimeout(() => {
      if (onComplete) onComplete();
    }, 5000);

    // Add a key listener for SPACE bar
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        clearTimeout(timeout); // Cancel auto transition
        if (onComplete) onComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timeout); // Clean up timeout
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div className="relative">
      <video
        muted
        autoPlay
        loop
        src="/sparks.mp4"
        style={{ width: "100%", height: "auto" }}
      ></video>
      <h1 className="absolute text-[#c2783c] font-samarkan top-1/3 left-1/3 text-5xl font-black animate-fade-in">
        Vyasa and Ganesha :
      </h1>
      <h4 className="absolute text-[#c2783c] top-[300px] left-[500px] text-3xl animate-fade-in">
        The Untold Story of the Mahabharata's Creation
      </h4>
      <p className="absolute text-[#c2783c] top-[600px] left-[450px] text-3xl animate-fade-in">
        Use Headphone for better experience
      </p>
    </div>
  );
};

export default FireSparkles;
