import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/axiosInstance';

export default function ResponseDetail() {
  const { quizId, responseId } = useParams();
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/quiz/${quizId}/responses/${responseId}`)
      .then((res) => setResponse(res.data.response))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load details'))
      .finally(() => setLoading(false));
  }, [quizId, responseId]);

  if (loading) return <div className="text-center text-xl">Loading details...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Student Response Detail</h1>
      <p className="mb-4"><strong>Name:</strong> {response.studentName}</p>
      <p className="mb-4"><strong>Email:</strong> {response.studentEmail}</p>
      <p className="mb-4"><strong>Score:</strong> {response.score}</p>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Answers</h2>
        {Object.entries(response.answers).map(([question, answer], idx) => (
          <div key={idx} className="p-4 mb-3 bg-gray-100 rounded-lg">
            <p className="font-bold">{idx + 1}. {question}</p>
            <p>Your Answer: <span className="text-blue-600">{answer}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}
