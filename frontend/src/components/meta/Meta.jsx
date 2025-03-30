import React, { useEffect, useState } from "react";
import PhaserGame from "./PhaserGame";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setGameLoading, setShower, setTalk } from "../../features/vedicSlice";
import { FaXmark } from "react-icons/fa6";
import axios from "axios";

function Meta() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [response, setResponse] = useState("Radhe Radhe! Traveller");
  const [message, setMessage] = useState("");
  const talkState = useSelector((state) => state.talkGuru);

  const navToHome = () => {
    dispatch(setGameLoading(true));
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const showerFunc = () => {
    console.log("hello");
    dispatch(setShower(true));
    const videoBox = document.getElementsByClassName("videoBox");
    setTimeout(() => {
      console.dir(videoBox);
      videoBox[0].style.display = "block";
    }, 3000);
    setTimeout(() => {
      dispatch(setShower(false));
      const video = document.getElementById("video");
      video.style.visibility = "visible";
      video.addEventListener("ended", () => {
        videoBox[0].style.display = "none";
      });
      video.play();
    }, 6000);
  };
  const handleSpech = (text) => {
    console.log("helloaaaa");
    const value = new SpeechSynthesisUtterance("namaste ");
    value.lang = "hi-IN";
    window.speechSynthesis.speak(value);
  };
  const getResponse = () => {
    const data = { message: `${message}` };
    console.log(data);
    axios
      .post("http://127.0.0.1:5000/saint_guidance", data)
      .then((response) => {
        setResponse(response.data.answer);
        handleSpech(response.data.answer);
        console.log(response.data.answer);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (talkState) {
      const chatBox = document.getElementsByClassName("guruTalk");
      chatBox[0].style.display = "block";
    }
  }, [talkState]);

  const closeChat = () => {
    const chatBox = document.getElementsByClassName("guruTalk");
    chatBox[0].style.display = "none";
    dispatch(setTalk(false));
    this.input.keyboard.enabled = true;
  };

  // setTimeout(()=>{
  //   const canvas=document.getElementById("game-container");

  //   canvas.requestFullscreen();

  // },1000)

  return (
    <div className="overflow-hidden h-[100vh] relative">
      <PhaserGame />

      <div
        className="homeBtn absolute top-4 right-4 bg-[#c89259] h-14 w-14 flex justify-center items-center rounded-[50%] cursor-pointer scale-[0.9] hover:scale-[1] transition-all duration-200 hover:shadow-lg hover:shadow-[rgba(0,0,0,0.3)]"
        onClick={navToHome}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 64 64"
          fill="#962729"
        >
          <path d="M 32 8 C 31.08875 8 30.178047 8.3091875 29.435547 8.9296875 L 8.8007812 26.171875 C 8.0357812 26.810875 7.7634844 27.925203 8.2714844 28.783203 C 8.9184844 29.875203 10.35025 30.088547 11.28125 29.310547 L 12 28.710938 L 12 47 C 12 49.761 14.239 52 17 52 L 47 52 C 49.761 52 52 49.761 52 47 L 52 28.712891 L 52.71875 29.3125 C 53.09275 29.6255 53.546047 29.777344 53.998047 29.777344 C 54.693047 29.777344 55.382672 29.416656 55.763672 28.722656 C 56.228672 27.874656 55.954891 26.803594 55.212891 26.183594 L 52 23.498047 L 52 15 C 52 13.895 51.105 13 50 13 L 48 13 C 46.895 13 46 13.895 46 15 L 46 18.484375 L 34.564453 8.9296875 C 33.821953 8.3091875 32.91125 8 32 8 z M 32 12.152344 C 32.11475 12.152344 32.228766 12.191531 32.322266 12.269531 L 48 25.369141 L 48 46 C 48 47.105 47.105 48 46 48 L 38 48 L 38 34 C 38 32.895 37.105 32 36 32 L 28 32 C 26.895 32 26 32.895 26 34 L 26 48 L 18 48 C 16.895 48 16 47.105 16 46 L 16 25.367188 L 31.677734 12.269531 C 31.771234 12.191531 31.88525 12.152344 32 12.152344 z"></path>
        </svg>
      </div>

      <div className="showerBtn absolute bottom-10 w-full hidden justify-center">
        <button
          className="bg-[#111111cf] text-[#df9732] px-2 py-1 rounded-lg hover:bg-black transition-all duration-200 active:scale-90"
          onClick={showerFunc}
        >
          Shower Flowers
        </button>
      </div>

      <div className="videoBox absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-hidden hidden h-full w-full">
        <div className="relative flex h-full justify-center items-center bg-[#00000088]">
          <p className="absolute text-center text-white text-2xl">
            Loading Your Today's Blessing....
          </p>
          <video
            src="./meta elements/seekh1.mp4"
            className="seekh1 z-10 invisible rounded-2xl"
            id="video"
            width={700}
            onEnd
          />
        </div>
      </div>

      <div className="guruTalk absolute top-0 left-0 backdrop-blur h-[100vh] w-[100vw] hidden">
        <FaXmark
          onClick={() => closeChat()}
          className="text-white absolute right-8 top-8 text-2xl"
        />
        {/* <div className="relative"> */}

        <img
          src="/teacher2.png"
          className="h-[700px] relative top-7 float-left"
        />
        <div className="dialogueBox bg-white absolute top-[10vh] left-[40vw] px-5 py-2 rounded-xl max-w-[40vw]">
          {response}
        </div>
        <div className="absolute bottom-[10vh] right-[10vw] flex items-center">
          <input
            type="text"
            className=" text-2xl mr-10 w-[30vw] rounded-lg px-2 py-1"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className="bg-[#FFB563] px-8 py-2 rounded-xl"
            onClick={getResponse}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default Meta;
