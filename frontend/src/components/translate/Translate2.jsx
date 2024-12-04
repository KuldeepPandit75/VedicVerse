import React, { useState } from "react";
import Navbar from "../header/Navbar";
import axios from "axios";
import { styled } from "styled-components";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

const Textarea = styled(TextareaAutosize)(`
    box-sizing: border-box;
    width: 80%;
    margin-top: 40px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: #3E2723; /* Dark Espresso */
    background: #FAF3E0; /* Warm Cream */
    border: 1px solid #A67C52; /* Antique Brown */
    box-shadow: 0 2px 2px #704214; /* Deep Brown Shadow */
  
    &:hover {
      border-color: #F4C542; /* Golden Yellow */
    }
  
    &:focus {
      outline: 0;
      border-color: #D97A3D; /* Burnt Orange */
      box-shadow: 0 0 0 3px #F4C542;
    }
  `);

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
    <div>
      <Navbar />
      <div
        className="flex justify-center items-center h-[70vh] w-screen bg-cover bg-center mt-10"
        style={{ backgroundImage: "url('/pagedesign.png')" }}
      >
        <div className=" w-[80%] h-[90%] rounded-2xl flex flex-col items-center p-6 overflow-hidden shadow-lg border border-[#A67C52]">
          <h2 className="text-[#704214] text-3xl text-center">
            Translate Sanskrit Verse to Hindi
          </h2>
          <h4 className="text-[#D97A3D] text-xl text-center mt-2">
            AI powered
          </h4>
          <Textarea
            maxRows={5}
            aria-label="empty textarea"
            placeholder="Enter the Verse"
            onChange={(e) => handleChange(e)}
          />

          <button
            onClick={getTranslation}
            className="bg-[#A41623] text-white text-xl font-medium py-2 px-6 rounded-lg mt-5 hover:bg-[#8C121E]"
          >
            Translate
          </button>
          <div className="mt-5 px-10 w-full">
            <h3 className="text-[#3E2723] text-2xl font-bold">Translation:</h3>
            <p className="text-[#3E2723] mt-2 text-xl">{translation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translate2;
