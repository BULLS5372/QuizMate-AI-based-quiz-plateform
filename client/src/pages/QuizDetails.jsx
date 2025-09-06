import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axiosInstance';
import TestRunner from '../components/TestRunner';

export default function QuizDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [start, setStart] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    name: '',
    email: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/quiz/${id}`).then((res) => setQuiz(res.data));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartQuiz = () => {
    if (!studentInfo.name.trim() || !studentInfo.email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    setError('');
    setStart(true);
  };

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="text-2xl text-blue-700 font-bold">Loading quiz...</div>
      </div>
    );
  }

  if (!start) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
        <div className="bg-white shadow-2xl rounded-xl p-10 w-5/5 max-w-4xl border border-blue-200 text-center">
          <h1 className="text-4xl font-extrabold mb-6 text-blue-700 drop-shadow">
            Attempting Quiz: {quiz.title || quiz.stu_class}
          </h1>
          <div className="mb-6 text-gray-700 text-lg">
            <p>
              <span className="font-semibold">Created By:</span>{' '}
              {quiz.createdBy || 'Unknown'}
            </p>
            <p>
              <span className="font-semibold">Created On:</span>{' '}
              {formatDate(quiz.createdAt)}
            </p>
          </div>
          <p className="mb-6 text-lg font-semibold text-purple-700">
            Total Questions: {quiz.questions.length}
          </p>

          {/* Student Info Form */}
          <div className="mb-6 text-left">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={studentInfo.name}
              onChange={handleInputChange}
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={studentInfo.email}
              onChange={handleInputChange}
              className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
          </div>

          <button
            // className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-10 py-4 rounded-xl shadow-xl font-bold text-2xl transition hover:scale-105 hover:shadow-2xl"
            className="bg-blue-100 text-blue-600 px-10 py-4 rounded-xl shadow-xl font-bold text-2xl transition hover:scale-105 hover:shadow-2xl"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <TestRunner
      questions={quiz.questions}
      quizId={quiz.id}
      studentInfo={studentInfo} // Pass student info to TestRunner
      onFinish={(answers) =>
        navigate(`/quiz/${id}/submit`, {
          state: {
            answers,
            quizId: quiz.id,
            studentName: studentInfo.name,
            studentEmail: studentInfo.email
          }
        })
      }
    />
  );
}

function formatDate(date) {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
