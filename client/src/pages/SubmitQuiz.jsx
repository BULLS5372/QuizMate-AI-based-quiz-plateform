import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';

export default function SubmitQuiz() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { answers, quizId, studentName, studentEmail } = state || {};
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    async function submitAnswers() {
      setLoading(true);
      setError('');
      try {
        const res = await API.post(`/quiz/${quizId}/submit`, {
          answers,
          studentName,
          studentEmail
        });
        setResult(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to submit quiz');
      } finally {
        setLoading(false);
      }
    }

    if (answers && quizId && studentName && studentEmail) {
      submitAnswers();
    } else {
      setError('Missing quiz data or student info.');
      setLoading(false);
    }
  }, [answers, quizId, studentName, studentEmail]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-10">
      {/* First Container: Quiz Result */}
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-2xl border border-blue-200 text-center">
        {loading ? (
          <div className="text-2xl text-blue-700 font-bold">Submitting your quiz...</div>
        ) : error ? (
          <div className="text-red-600 text-xl">{error}</div>
        ) : result ? (
          <>
            <h1 className="text-3xl font-extrabold mb-4 text-blue-700 drop-shadow">
              Quiz Result
            </h1>
            <div className="mb-6 text-lg text-gray-700">
              <span className="font-bold text-purple-700">Score:</span>{' '}
              {result.score} / {result.total}
            </div>
            <div className="mb-6 text-lg text-gray-700">
              <span className="font-bold text-pink-700">Percentage:</span>{' '}
              {((result.score * 100) / result.total).toFixed(2)}%
            </div>
            <div className="mb-6 text-lg text-gray-700">
              <span className="font-bold text-green-700">Submitted By:</span>{' '}
              {studentName} ({studentEmail})
            </div>
            <div className="flex justify-center gap-4">
              <button
                // className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg shadow-lg font-bold text-xl transition hover:scale-105"
                className="bg-blue-100 text-blue-600 px-8 py-3 rounded-lg shadow-lg font-bold text-xl transition hover:scale-105"
                onClick={() => navigate('/')}
              >
                Back to Home
              </button>
              <button
                className="bg-gradient-to-r from-green-100 to-green-200 text-green-600 px-8 py-3 rounded-lg shadow-lg font-bold text-xl transition hover:scale-105"
                onClick={() => {
                  setShowAnswers(!showAnswers);
                  setTimeout(() => {
                    if (!showAnswers) {
                      document
                        .getElementById('answers-section')
                        .scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                {showAnswers ? 'Hide Answers' : 'View Answers'}
              </button>
            </div>
          </>
        ) : null}
      </div>

      {/* Second Container: Answers (Full Width) */}
      {showAnswers && result?.correctAnswers && (
        <div
          id="answers-section"
          className="mt-10 w-full max-w-6xl bg-white rounded-xl shadow-2xl p-10 border border-green-200"
        >
          <h2 className="text-3xl font-bold mb-6 text-blue-600 text-center">
            Your Answers
          </h2>
          <div className="grid gap-6">
            {Object.keys(answers).map((question, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 border rounded-lg shadow hover:shadow-lg transition"
              >
                <p className="font-semibold text-xl mb-3">
                  {idx + 1}. {question}
                </p>
                <p className="mb-2">
                  <span className="font-bold text-gray-700">Your Answer:</span>{' '}
                  <span
                    className={`${
                      answers[question] === result.correctAnswers[question]
                        ? 'text-green-600 font-semibold'
                        : 'text-red-600 font-semibold'
                    }`}
                  >
                    {answers[question]}
                  </span>
                </p>
                <p>
                  <span className="font-bold text-gray-700">Correct Answer:</span>{' '}
                  <span className="text-green-700 font-semibold">
                    {result.correctAnswers[question]}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
