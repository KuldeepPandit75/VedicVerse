import React, { useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { gsap } from "gsap";
import LeafComponents from "./leaf";
import verse from "./json/verse.json";
import translations from "./json/translation.json";
import chapters from "./json/chapters.json";
import stripeTexture from "/public/stripe.png";
const BookContainer = () => {
  const linkedListArray = [];
  const [bookMarked, setBookMarked] = useState(
    localStorage.getItem("bookMarked") || 0
  );

  for (let i = 0; i < 10; i++) {
    const page = {
      chapter: `अध्याय ${verse[i].chapter_number}`,
      chapter_number: `${verse[i].chapter_number}`,
      श्लोक: ` ${verse[i].verse_number}`,
      title: "गुणत्रयविभागयोग",
      sanskrit: ` ${verse[i].text}`,
      translation: `${translations.hindi[i].description}`,
    };

    const trans = {
      chapter: `Chapter ${verse[i].chapter_id}`,
      author_id: 16,
      श्लोक: ` ${verse[i].verse_number}`,
      chapter_number: `${verse[i].chapter_number}`,
      description:
        "Here are heroes, mighty archers, equal in battle to Bhima and Arjuna, Yuyudhana (Satyaki), Virata, and Drupada—all mighty warriors.",
      transliteration: `${verse[i].transliteration}`,
      translation: `${translations.english[i].description}`,
    };

    linkedListArray.push(page, trans);
  }
  // console.log(verse.length);
  // console.log(translations.length);
  // console.log(translations.english.length);
  // console.log(translations.hindi.length);
  // console.log(linkedListArray);

  const contBoxRef = useRef(null);
  const bookRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      contBoxRef.current,
      { x: "-100vw", opacity: 0 },
      {
        x: "0",
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      }
    );
  }, []);

  const CoverPage = () => (
    <div className="cover-page relative w-full h-full bg-gradient-to-br from-[#8B4513] to-[#654321]">
      <img src="/cover/gita.jpg" alt="frontPage   " />
    </div>
  );
  const pageFlipSound = useRef(new Audio("/pageTurnSound.mp3"));

  const goToBookmarkedPage = () => {
    console.log("Flipping to bookmarked page:", bookMarked);
    console.log(bookMarked);

    bookRef.current.pageFlip().flip(parseInt(bookMarked, 10));
  };

  const handleStartPageFlip = (currentPage) => {
    pageFlipSound.current.currentTime = 0;
    pageFlipSound.current.play();
    setBookMarked(currentPage);
    localStorage.setItem("bookMarked", currentPage); // Store the current page in localStorage
    console.log("Current Page:", currentPage); // Log the current page directly
  };

  const flipToPrevPage = () => {
    bookRef.current.pageFlip().flipPrev();
  };

  const flipToNextPage = () => {
    bookRef.current.pageFlip().flipNext();
  };

  return (
    <div className="container min-h-screen min-w-full bg-gradient-to-b from-[#f7e6d0] to-[#e09c4f]">
      {}
      <div className="absolute inset-0 z-10">
        <LeafComponents />
      </div>

      <div
        ref={contBoxRef}
        className="flipbook-container relative z-10 flex  justify-center pr-8 items-center min-h-screen py-5"
      >
        <HTMLFlipBook
          ref={bookRef}
          width={400}
          height={600}
          size="fixed"
          minWidth={300}
          maxWidth={800}
          minHeight={450}
          maxHeight={1000}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          className="demo-book"
          style={{ gap: "50px" }}
          flippingTime={2000}
          // onChangeState={handleStartPageFlip}
          // onStartPageFlip={handleStartPageFlip}
          onFlip={(e) => handleStartPageFlip(e.data)}
          // onInit={handleStartPageFlip}
          drawShadow={true}
        >
          {/* cover pages */}
          <div className="page">
            <CoverPage />
          </div>

          {/* pages*/}
          {/* this part is done in future  */}
          {/* {  <div className="cover-page relative w-full h-full bg-gradient-to-br from-[#8B4513] to-[#654321]">
            <div className="z-0 absolute top-0 left-0">
              <img className="h-[600px]" src="/border3.webp" alt="error" />
            </div>
          </div>
          <div className="header text-center bg-[#efe2cf]  mb-6">
            <div className="ornamental-border flex items-center justify-center gap-2 mb-2">
              <img src="/left3.png" className="w-28  h-14 " alt="" />
              <img
                src="om2.png"
                alt="Om"
                className="w-14 h-42 transform hover:rotate-180 transition-transform duration-1000"
              />
              <img src="/left5.png" className="w-28 h-14 rotate-180" alt="" />
            </div>

            <div className=" top-48 left-20 -z-10 absolute opacity-80">
              <img src="/water2.png" alt="waterMark" />
            </div>
          </div>} */}

          {linkedListArray.map((page, index) => (
            <div
              key={index}
              className="page-content bg-[#efe2cf] rounded-lg p-6"
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <div className="header text-center  mb-6">
                <div className="ornamental-border flex items-center justify-center gap-2 mb-2">
                  <img src="/left3.png" className="w-28  h-14 " alt="" />
                  <img
                    src="om2.png"
                    alt="Om"
                    className="w-14 h-42 transform hover:rotate-180 transition-transform duration-1000"
                  />
                  <img
                    src="/left5.png"
                    className="w-28 h-14 rotate-180"
                    alt=""
                  />
                </div>

                <h1 className="text-2xl font-bold text-[#8B4513] mb-2 font-sanskrit drop-shadow-lg">
                  {page.chapter}
                </h1>
                <h2 className="text-lg font-semibold text-[#8B4513] font-sanskrit">
                  {page.sanskrit ? " श्लोक " : "Verse"}
                  {"\t"}
                  {page.chapter_number}.{page.श्लोक}
                </h2>

                <div className="text-center mt-4">
                  {page.sanskrit ? " ~ श्लोक ~" : "~ Verse ~"}
                </div>
                <div className="content  text-lg  text-center m-auto w-80 h-80 rounded-lg  ">
                  {/* Sholk */}
                  {page.sanskrit || page.transliteration}
                  <div className="text-center mt-10">
                    {page.sanskrit ? " ~ अर्थ ~" : "~ Meaning ~"}
                  </div>
                  {page.translation || page.description}
                </div>

                <div className=" top-48 left-20 -z-10 absolute opacity-80">
                  <img src="/water2.png" alt="waterMark" />
                </div>
                <div className="z-0 absolute top-0 left-0">
                  <img className="h-[600px]" src="/border3.webp" alt="error" />
                </div>
                <div className=" text-center mt-6 relative">
                  <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
                  </div>
                  <div className="relative inline-block">
                    <span className="inline-block px-8 py-1 text-lg text-[#8B4513] border-2 border-[#d4af37] rounded-full bg-[#fff9f0] relative z-10">
                      पृष्ठ {index + 1} / {linkedListArray.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </HTMLFlipBook>
      </div>
      <button
        className=" tongleButton absolute left-16 top-1/2 w-20 h-20 z-20 transform -translate-y-1/2 text-white bg-[#9c511cf0] p-3 rounded-full  hover:bg-[#8B4513]"
        onClick={flipToPrevPage}
      >
        ←
      </button>

      <button
        className=" tongleButton absolute right-16 top-1/2 w-20 h-20 z-20 transform -translate-y-1/2 text-white bg-[#9c511cf0] p-3 rounded-full  hover:bg-[#8B4513]"
        onClick={flipToNextPage}
      >
        →
      </button>
      <div className=" z-20 absolute top-0 right-28 cursor-pointer">
        <div onClick={() => goToBookmarkedPage()}>
          <img
            className="w-[100px] h-[200px]"
            src={stripeTexture}
            alt="error"
          />
        </div>

        <div className="absolute top-20 right-7 bg-[#efe2cf81] w-9 h-10 z-10 text-center text-4xl flex justify-center items-center">
          {bookMarked}
        </div>
      </div>
    </div>
  );
};

export default BookContainer;
