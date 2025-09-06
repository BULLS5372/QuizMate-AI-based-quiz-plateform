import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axiosInstance';

export default function ResponsesPage() {
  const { id } = useParams(); // quizId
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get(`/quiz/${id}/responses`)
      .then((res) => setResponses(res.data.responses))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load responses'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center text-xl">Loading responses...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">Quiz Leaderboard – View Each Student's Answers</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Rank</th>
            <th className="border px-4 py-2">Student Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Score</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((res, idx) => (
            <tr key={res._id} className="text-center">
              <td className="border px-4 py-2">{idx + 1}</td>
              <td className="border px-4 py-2">{res.studentName}</td>
              <td className="border px-4 py-2">{res.studentEmail}</td>
              <td className="border px-4 py-2 font-bold">{res.score}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-100 text-green-600 px-4 py-1 rounded"
                  onClick={() => navigate(`/quiz/${id}/responses/${res._id}`)}
                >
                  View Answers
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
