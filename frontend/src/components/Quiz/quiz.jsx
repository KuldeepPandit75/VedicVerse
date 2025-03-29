import React, { useState, useRef, useEffect } from "react";

export default function QuizPage() {
  const contentRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const questions = [
    {
      question: "Which is the oldest Veda?",
      options: ["Rigveda", "Samaveda", "Yajurveda", "Atharvaveda"],
      correctAnswer: "Rigveda",
    },
    {
      question: "Which Veda is known as the 'Veda of Melodies'?",
      options: ["Rigveda", "Samaveda", "Yajurveda", "Atharvaveda"],
      correctAnswer: "Samaveda",
    },
    {
      question: "What does the word 'Veda' mean?",
      options: ["Knowledge", "Wisdom", "Scripture", "Tradition"],
      correctAnswer: "Knowledge",
    },
  ];

  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        setIsOverflowing(
          contentRef.current.scrollHeight > contentRef.current.clientHeight
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  const handleAnswer = (option) => {
    setUserAnswers({ ...userAnswers, [currentQuestion]: option });
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="quiz-page relative overflow-hidden flex">
      <img
        className="w-full h-screen object-cover"
        src="https://res.cloudinary.com/kuldeepcloudinary/image/upload/v1743241191/pagedesign_dfgion.png"
        alt="Quiz Background"
      />

      {/* Sidebar */}
      <div className="absolute left-3 top-1/3 transform -translate-y-1/2 bg-opacity-80 bg-[#a8661cb5] text-white p-2 w-40 rounded-xl">
        <h3 className="text-xl text-center font-bold text-black">Questions</h3>
        <ul className="mt-4 flex gap-2 flex-wrap">
          {questions.map((_, index) => (
            <li key={index} className="mb-2 ">
              <button
                onClick={() => setCurrentQuestion(index)}
                className={`text-center w-11 px-3 py-2 rounded-md ${
                  currentQuestion === index
                    ? "bg-amber-800"
                    : "bg-amber-700 hover:bg-amber-800"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={contentRef}
        className="absolute top-5 left-10 md:left-56 text-white p-6 bg-opacity-70 rounded-lg md:w-[850px] overflow-y-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#5a040dfa]">
          Quiz on Vedic Knowledge
        </h1>

        <div className="mt-6">
          <h3 className="text-xl md:text-2xl font-semibold text-red-800/90">
            {`Question ${currentQuestion + 1} of ${questions.length}`}
          </h3>
          <p className="mt-3 text-lg md:text-2xl font-semibold text-center text-red-800">
            {questions[currentQuestion].question}
          </p>
          <ul className="mt-4 list-disc pl-6">
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} className="mt-2">
                <button
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-2 rounded-md border bg-[#ae9b70] hover:bg-[#8b561abb] transition ${
                    userAnswers[currentQuestion] === option
                      ? "bg-amber-800 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-around">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="bg-amber-800 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-[#8b561abb] transition"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQuestion === questions.length - 1}
              className="bg-amber-800 text-white px-4 py-2 rounded-lg hover:bg-[#5f4425] transition"
            >
              Next
            </button>
          </div>
        </div>

        <p className="mt-6 text-center">
          {currentQuestion === questions.length - 1 && "End of the Quiz!"}
        </p>
      </div>

      {isOverflowing && (
        <div className="text-center mt-8">
          <button
            onClick={scrollToContent}
            className="bg-amber-800 text-white p-3 rounded-md hover:bg-amber-700 transition"
          >
            Scroll to Read More
          </button>
        </div>
      )}
    </section>
  );
}
