import React, { useState } from "react";
import happyFace from "./happy-removebg-preview.png"; // Happy face image
import sadFace from "./sad-removebg-preview.png"; // Sad face image

const questions = [
  { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], answer: "William Shakespeare" },
  { question: "What is the boiling point of water at sea level?", options: ["90°C", "100°C", "120°C", "150°C"], answer: "100°C" },
  { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"], answer: "Blue Whale" },
  { question: "What is the primary language spoken in Brazil?", options: ["Spanish", "Portuguese", "French", "English"], answer: "Portuguese" },
  { question: "What is the currency of Japan?", options: ["Yen", "Won", "Euro", "Dollar"], answer: "Yen" },
  { question: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"], answer: "Leonardo da Vinci" },
  { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Pb", "Fe"], answer: "Au" },
  { question: "Which country is known as the Land of the Rising Sun?", options: ["India", "China", "Japan", "Thailand"], answer: "Japan" },
  { question: "Which element has the chemical symbol O?", options: ["Oxygen", "Gold", "Iron", "Silver"], answer: "Oxygen" },
  { question: "What is the fastest land animal?", options: ["Lion", "Cheetah", "Horse", "Elephant"], answer: "Cheetah" },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], answer: "Pacific Ocean" },
  { question: "Which year did World War II end?", options: ["1942", "1945", "1948", "1950"], answer: "1945" },
  { question: "Who developed the theory of relativity?", options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Nikola Tesla"], answer: "Albert Einstein" },
  { question: "What is the longest river in the world?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], answer: "Nile" },
  { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
  { question: "What is the national flower of Japan?", options: ["Lotus", "Rose", "Cherry Blossom", "Tulip"], answer: "Cherry Blossom" },
  { question: "What is the smallest planet in our solar system?", options: ["Venus", "Mars", "Mercury", "Pluto"], answer: "Mercury" },
  { question: "Who was the first man to step on the Moon?", options: ["Buzz Aldrin", "Yuri Gagarin", "Neil Armstrong", "Michael Collins"], answer: "Neil Armstrong" },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionClick = (option) => {
    if (!userAnswers[currentQuestion]) {
      const isCorrect = option === questions[currentQuestion].answer;
      setUserAnswers({
        ...userAnswers,
        [currentQuestion]: {
          selectedOption: option,
          isCorrect,
        },
      });

      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleDone = () => {
    setIsFinished(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setScore(0);
    setIsFinished(false);
  };

  const currentAnswer = userAnswers[currentQuestion];

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-600">
      {!isFinished ? (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
          <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6 animate-pop-up">Quiz Time!</h2>

          <div className="text-xl mb-4 text-center text-gray-800">
            <span className="font-bold text-purple-600">Question {currentQuestion + 1} / {questions.length}</span>
          </div>
          <div className="text-xl mb-4 text-center text-gray-800">{questions[currentQuestion].question}</div>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`w-full py-3 px-6 rounded-lg border font-semibold transition duration-300 ease-in-out transform hover:scale-105 ${
                  currentAnswer?.selectedOption === option
                    ? currentAnswer.isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-yellow-300 hover:bg-yellow-400"
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={!!currentAnswer}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="flex justify-center mt-4">
            {currentAnswer && currentAnswer.isCorrect && (
              <div className="flex justify-center items-center">
                <img src={happyFace} alt="Happy Character" className="w-16 h-16 animate-bounce transition-all duration-300" />
                <span className="text-xl font-semibold text-green-500 ml-2">Good Job!</span>
              </div>
            )}
            {currentAnswer && !currentAnswer.isCorrect && (
              <div className="flex justify-center items-center">
                <img src={sadFace} alt="Sad Character" className="w-16 h-16 animate-bounce transition-all duration-300" />
                <span className="text-xl font-semibold text-red-500 ml-2">Oops, Try Again!</span>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handlePreviousQuestion}
              className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300"
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleDone}
                className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-all duration-300"
              >
                Done
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-semibold text-center text-purple-700 mb-6">Quiz Finished!</h2>
          <p className="text-xl text-center text-gray-800 mb-4">Your Final Score: {score} / {questions.length}</p>
          <p className="text-lg text-center text-gray-700 mb-6">
            {score > questions.length / 2 ? "Great job! You did well!" : "Don't worry, keep practicing!"}
          </p>
          <div className="text-left">
            <h3 className="text-xl font-bold mb-4 text-purple-600">Correct Answers:</h3>
            <ul className="list-disc list-inside text-gray-800">
              {questions.map((q, index) => (
                <li key={index}>
                  <strong>{q.question}</strong>: {q.answer}
                </li>
              ))}
            </ul>
          </div>
          <button
            onClick={handleRestart}
            className="bg-blue-500 text-white py-3 px-6 rounded-lg mt-6 hover:bg-blue-600 transition-all duration-300 w-full"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

