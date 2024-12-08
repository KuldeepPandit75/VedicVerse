import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import axios from "axios";
import { useSpeechSynthesis } from "react-speech-kit";
import { FcSpeaker } from "react-icons/fc";
import "./translate.css";

function Translate2() {
  const [translation, setTranslation] = useState("First enter the Verse");
  const [verse, setVerse] = useState("");
  const [lang, setLang] = useState("Hindi");
  const { speak, voices } = useSpeechSynthesis();
  const [filteredVoices, setFilteredVoices] = useState([]);

  const handleChange = (e) => {
    setVerse(e.target.value);
  };

  const getTranslation = () => {
    const data = { message: `${lang} ${verse}` };
    axios
      .post("http://127.0.0.1:5000/predictu", data)
      .then((response) => {
        setTranslation(response.data.answer);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  // voice part
  const languageOptions = {
    Hindi: "hi-IN",
    English: "en-US",
    French: "fr-FR",
    Spanish: "es-ES",
    Arabic: "ar-SA",
    Marathi: "mr-IN",
    Bhojpuri: "hi-IN",
  };
  useEffect(() => {
    const availableVoices = voices.filter((voice) =>
      Object.values(languageOptions).includes(voice.lang)
    );
    setFilteredVoices(availableVoices);
  }, [voices]);

  const readTranslation = () => {
    const selectedVoice = filteredVoices.find(
      (voice) => voice.lang === languageOptions[lang]
    );
    console.log(selectedVoice);
    if (selectedVoice) {
      speak({ text: translation, voice: selectedVoice, rate: 0.6 });
    } else {
      alert(`Voice for ${lang} is not available in your browser.`);
    }
  };

  return (
    <div className="h-screen">
      <Navbar />
      <div
        className="flex justify-center items-center h-[70vh] w-screen bg-cover bg-center mt-10"
        style={{ backgroundImage: "url('/pagedesign.png')" }}
      >
        <div className="w-[80%] h-[90%] rounded-2xl flex flex-col items-center p-6 overflow-hidden">
          <h2 className="text-[#3e2723ef] text-3xl text-center">
            Translate Sanskrit Verse to {lang}
          </h2>
          <h4 className="text-[#966433] text-xl text-center mt-2">
            AI powered
          </h4>

          <select
            id="language"
            name="language"
            onChange={(e) => setLang(e.target.value)}
            value={lang}
            className="rounded-lg bg-[#d6b086bb] mt-4"
          >
            {Object.keys(languageOptions).map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>

          <input
            className="textarea mt-4"
            placeholder="Enter the Verse"
            onChange={() => handleChange()}
            value={verse}
          />

          <button
            onClick={() => getTranslation()}
            className="bg-[#A41623] text-white text-xl font-medium py-2 px-6 rounded-lg mt-5 hover:bg-[#8c121e]"
          >
            Translate
          </button>

          <div className="mt-5 px-10 w-full flex flex-col justify-center items-center">
            <h3 className="text-[#6f2214] text-4xl font-bold text-left w-full">
              Translation:
            </h3>
            <p className="text-[black] mt-2 text-xl  font-medium ml-3 w-[80%]">
              {translation}
            </p>

            <div
              onClick={() => readTranslation()}
              className=" cursor-pointer  rounded-lg mt-4 absolute top-[480px] right-64 hover:bg-[#2e1e18] "
            >
              <FcSpeaker className="w-8 h-8 " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translate2;
