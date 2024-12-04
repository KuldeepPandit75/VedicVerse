import React, { useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { gsap } from "gsap";
import LeafComponents from "./leaf";

const BookContainer = () => {
  const pages = [
    {
      chapter: "अध्याय १४",
      श्लोक: " १४.२",
      title: "गुणत्रयविभागयोग",
      sanskrit:
        " 1 इदं ज्ञानमुपाश्रित्य मम साधर्म्यमागताः। सर्गेऽपि नोपजायन्ते प्रलये न व्यथन्ति च।।",
      translation:
        "By knowing this knowledge, you will attain oneness with Me. Even at creation, you won’t be born, and at dissolution, you will not suffer.",
    },
    {
      chapter: "अध्याय १४",
      श्लोक: " १४.२",
      title: "गुणत्रयविभागयोग",
      sanskrit:
        " 1 इदं ज्ञानमुपाश्रित्य मम साधर्म्यमागताः। सर्गेऽपि नोपजायन्ते प्रलये न व्यथन्ति च।।",
      translation:
        "By knowing this knowledge, you will attain oneness with Me. Even at creation, you won’t be born, and at dissolution, you will not suffer.",
    },
    {
      chapter: "अध्याय १४",
      श्लोक: " १४.२",
      title: "गुणत्रयविभागयोग",
      sanskrit:
        " 1 इदं ज्ञानमुपाश्रित्य मम साधर्म्यमागताः। सर्गेऽपि नोपजायन्ते प्रलये न व्यथन्ति च।।",
      translation:
        "By knowing this knowledge, you will attain oneness with Me. Even at creation, you won’t be born, and at dissolution, you will not suffer.",
    },
    {
      chapter: "अध्याय १४",
      श्लोक: " १४.२",
      title: "गुणत्रयविभागयोग",
      sanskrit:
        " 1 इदं ज्ञानमुपाश्रित्य मम साधर्म्यमागताः। सर्गेऽपि नोपजायन्ते प्रलये न व्यथन्ति च।।",
      translation:
        "By knowing this knowledge, you will attain oneness with Me. Even at creation, you won’t be born, and at dissolution, you will not suffer.",
    },
    {
      chapter: "अध्याय १४",
      श्लोक: " १४.२",
      title: "गुणत्रयविभागयोग",
      sanskrit:
        " 1 इदं ज्ञानमुपाश्रित्य मम साधर्म्यमागताः। सर्गेऽपि नोपजायन्ते प्रलये न व्यथन्ति च।।",
      translation:
        "By knowing this knowledge, you will attain oneness with Me. Even at creation, you won’t be born, and at dissolution, you will not suffer.",
    },
  ];
  const trans = [
    {
      authorName: "chapter 15",
      author_id: 16,
      description:
        "Here are heroes, mighty archers, equal in battle to Bhima and Arjuna, Yuyudhana (Satyaki), Virata, and Drupada—all mighty warriors.",
      id: 26,
      lang: "english",
      language_id: 1,
      verseNumber: 4,
      verse_id: 4,
    },
    {
      authorName: "Swami Sivananda",
      author_id: 16,
      description:
        "Dhrishtaketu, Chekitana, the valiant king of Kasi, Purujit, Kuntibhoja, and Saibya—the best of men.",
      id: 33,
      lang: "english",
      language_id: 1,
      verseNumber: 5,
      verse_id: 5,
    },
  ];

  const linkedListArray = [];
  const maxLength = Math.max(pages.length, trans.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < pages.length) {
      linkedListArray.push(pages[i]);
    }
    if (i < trans.length) {
      linkedListArray.push(trans[i]);
    }
  }

  console.log(linkedListArray);
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

  const handleStartPageFlip = () => {
    pageFlipSound.current.currentTime = 0;
    pageFlipSound.current.play();
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
          onChangeState={handleStartPageFlip}
          // onStartPageFlip={handleStartPageFlip}
          // onFlip={handleStartPageFlip}
          // onInit={handleStartPageFlip}
          drawShadow={true}
        >
          {/* cover pages */}
          <div className="page">
            <CoverPage />
          </div>

          {/* pages*/}
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

                <h1 className="text-xl font-bold text-[#8B4513] mb-2 font-sanskrit drop-shadow-lg">
                  {page.chapter || page.authorName}
                </h1>
                <h2 className="text-base font-semibold text-[#8B4513] font-sanskrit">
                  {page.श्लोक || page.verseNumber}
                </h2>

                <div className="text-center mt-8">
                  {page.sanskrit ? " ~ श्लोक ~" : "~ अर्थ ~"}
                </div>
                <div className="content flex   text-center m-auto w-80 h-80 rounded-lg p-6 ">
                  {/* Sholk */}
                  {page.sanskrit || page.description}
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
    </div>
  );
};

export default BookContainer;
