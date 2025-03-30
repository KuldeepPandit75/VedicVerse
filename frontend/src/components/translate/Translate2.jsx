import React, { useState, useEffect } from "react";
import Navbar from "../header/Navbar";
import axios from "axios";
import { useSpeechSynthesis } from "react-speech-kit";
import { FcSpeaker } from "react-icons/fc";
import "./translate.css";
import { FaMicrophone } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Translate2() {
  const [translation, setTranslation] = useState("First enter the Verse");
  const [verse, setVerse] = useState("");
  const [lang, setLang] = useState("Hindi");
  const { speak, voices } = useSpeechSynthesis();
  const [filteredVoices, setFilteredVoices] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setVerse(transcript);
    }
  }, [transcript]);

  const handleChange = (e) => {
    setVerse(e.target.value);
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
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
      speak({ text: translation, voice: selectedVoice, rate: 0.8 });
    } else {
      alert(`Voice for ${lang} is not available in your browser.`);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className=" main flex justify-center items-center md:h-[80vh] h-[100vh]   w-screen   bg-cover bg-center mt-10">
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

          <div className="w-[95%] flex justify-center items-center  ">
            <input
              className="textarea"
              placeholder="Enter the Verse"
              onChange={(e) => handleChange(e)}
              value={verse}
            />
            <button
              onClick={toggleListening}
              className={`flex items-center justify-center p-4 hover:scale-125 rounded-xl ${
                isListening ? "text-red-500" : ""
              }`}
            >
              <FaMicrophone />
            </button>
          </div>

          <button
            onClick={() => getTranslation()}
            className="bg-[#A41623] text-white text-xl font-medium py-2 px-6 rounded-lg mt-5 hover:bg-[#8c121e]"
          >
            Translate
          </button>

          <div className="mt-5 px-10 w-full flex flex-col justify-center items-center">
            <h3 className="text-[#6f2214] text-4xl font-bold text-left w-full md:ml-16">
              Translation:
            </h3>
            <p className="text-[black] mt-2 text-xl  font-medium ml-3 w-[80%]">
              {translation}
            </p>

            <div
              onClick={() => readTranslation()}
              className=" cursor-pointer rounded-xl  absolute top-[650px] right-16 md:top-[600px] md:right-64 hover:bg-[#2e1e18] "
            >
              <FcSpeaker className="w-8 h-8  " />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Translate2;
