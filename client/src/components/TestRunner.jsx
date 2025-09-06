import React, { useState, useEffect } from 'react';

export default function TestRunner({ questions, quizId, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer === 0) {
      handleNext();
      return;
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleOption = (opt) => {
    setAnswers({ ...answers, [questions[current].question]: opt });
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimer(60);
    } else {
      onFinish(answers);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-4/5 max-w-4xl border border-blue-200">
        <h2 className="text-3xl font-extrabold mb-6 text-blue-700 text-center drop-shadow">
          Question {current + 1} of {questions.length}
        </h2>
        <div className="mb-6 text-xl text-gray-800 font-semibold text-center">
          {questions[current].question}
        </div>
        <ul className="mb-8 space-y-4">
          {questions[current].options.map((opt, idx) => (
            <li key={idx}>
              <button
                className={`w-full text-left px-5 py-4 rounded-lg border text-lg transition font-medium
                  ${
                    answers[questions[current].question] === opt
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'border-gray-300 bg-gray-50 hover:bg-purple-100 hover:border-purple-400'
                  }`}
                onClick={() => handleOption(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <span className="font-mono text-xl text-red-600 bg-red-100 px-6 py-3 rounded-lg shadow">
            ⏳ {timer}s
          </span>
          <button
            className="bg-gradient-to-r from-green-100 to-green-200 text-green-600 px-8 py-3 rounded-xl shadow-xl font-bold text-xl transition hover:scale-105 hover:shadow-2xl"
            onClick={handleNext}
          >
            {current === questions.length - 1 ? 'Submit Quiz' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
