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
    <section className="quiz-page relative overflow-hidden">
      <img
        className="w-full h-screen object-cover"
        src="/pagedesign.png"
        alt="Quiz Background"
      />
      <div
        ref={contentRef}
        className="absolute top-5 left-10 md:left-56 text-white p-6 bg-opacity-70 rounded-lg md:w-[850px] overflow-y-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#5a040dfa]">
          Quiz on Vedic Knowledge
        </h1>

        <div className="mt-6">
          <h3 className="text-xl md:text-2xl font-semibold text-red-800">
            {`Question ${currentQuestion + 1} of ${questions.length}`}
          </h3>
          <p className="mt-3 text-lg md:text-xl text-red-800">
            {questions[currentQuestion].question}
          </p>
          <ul className="mt-4 list-disc pl-6">
            {questions[currentQuestion].options.map((option, index) => (
              <li key={index} className="mt-2">
                <button
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-2 rounded-md border bg-gradient-to-r from-[#beae88] via-[#eed9a7] to-[#d5b68e] text-[#5a3e20] shadow-md shadow-black/20 inset-shadow hover:from-[#f6e9c8] hover:via-[#eed3a1] hover:to-[#d4b185] hover:border-[#c29f77] opacity-60-700 transition ${
                    userAnswers[currentQuestion] === option
                      ? "bg-[#d6b086bb] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {option}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
            >
              Previous
            </button>
            <button
              onClick={nextQuestion}
              disabled={currentQuestion === questions.length - 1}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
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
            className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 transition"
          >
            Scroll to Read More
          </button>
        </div>
      )}
    </section>
  );
}
