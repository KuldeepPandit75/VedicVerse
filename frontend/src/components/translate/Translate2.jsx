import React, { useState } from "react";
import Navbar from "../header/Navbar";
import axios from "axios";
import { styled } from "styled-components";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import "./translate.css";

function Translate2() {
  const [translation, setTranslation] = useState("First enter the Verse");
  const [verse, setVerse] = useState(null);

  const handleChange = (e) => {
    setVerse(e.target.value);
  };

  const data = { message: verse };

  const getTranslation = () => {
    axios
      .post("http://127.0.0.1:5000/predictu", data)
      .then((response) => {
        console.log("Response Data:", response.data);
        setTranslation(response.data.answer);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div
        className="flex justify-center items-center h-[70vh] w-screen bg-cover bg-center mt-10"
        style={{ backgroundImage: "url('/pagedesign.png')" }}
      >
        <div className=" w-[80%] h-[90%] rounded-2xl flex flex-col items-center p-6 overflow-hidden">
          <h2 className="text-[#3e2723ef] text-3xl text-center">
            Translate Sanskrit Verse to Hindi
          </h2>
          <h4 className=" text-[#633f1b] text-xl text-center mt-2">
            AI powered
          </h4>
          <input
            className="textarea"
            maxRows={5}
            aria-label="empty textarea"
            placeholder="Enter the Verse"
            onChange={(e) => handleChange(e)}
          />

          <button
            onClick={getTranslation}
            className="bg-[#A41623] text-white text-xl font-medium font-samarkan   py-2 px-6 rounded-lg mt-5 hover:bg-[#8c121e]"
          >
            Translate
          </button>
          <div className="mt-5 px-10 w-full ml-10">
            <h3 className="text-[#6f2214] text-4xl font-bold text-left font-samarkan ml-8">
              Translation:
            </h3>
            <p className="text-[#6f2214] mt-2 text-xl  font-medium ml-3">
              {translation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translate2;
