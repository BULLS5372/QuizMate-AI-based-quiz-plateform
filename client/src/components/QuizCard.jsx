import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Trash2, Eye, List } from 'lucide-react';

export default function QuizCard({ quiz, onDelete }) {
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-GB');
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 border border-purple-200 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col justify-between">
      {/* Title */}
      <div className="mb-4">
        <h3 className="text-2xl font-extrabold text-purple-700">{quiz.title || quiz.stu_class}</h3>
      </div>

      {/* Meta Info */}
      <div className="space-y-2 mb-6 text-sm text-gray-600">
        <p className="flex items-center gap-2">
          <User size={16} className="text-purple-500" />
          Created by: <span className="font-semibold text-gray-800">{quiz.createdBy || 'Unknown'}</span>
        </p>
        <p className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-500" />
          Created on: <span>{formatDate(quiz.createdAt)}</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-3 gap-3 mt-auto">
        {/* Delete Button */}
        <button
          className="flex items-center justify-center gap-1 bg-red-100 text-red-600 py-2 rounded-lg shadow-sm font-semibold text-sm hover:bg-red-200 hover:scale-105 transition"
          onClick={() => onDelete(quiz.id || quiz._id)}
        >
          <Trash2 size={16} />
          Delete
        </button>

        {/* Responses Button */}
        <button
          className="flex items-center justify-center gap-1 bg-green-100 text-green-600 py-2 rounded-lg shadow-sm font-semibold text-sm hover:bg-green-200 hover:scale-105 transition"
          onClick={() => navigate(`/quiz/${quiz.id || quiz._id}/responses`)}
        >
          <List size={16} />
          Responses
        </button>

        {/* Attempt Button */}
        <button
          className="flex items-center justify-center gap-1 bg-blue-100 text-blue-600 py-2 rounded-lg shadow-sm font-semibold text-sm hover:bg-blue-200 hover:scale-105 transition"
          onClick={() => navigate(`/quiz/${quiz.id || quiz._id}`)}
        >
          {/* <Eye size={16} /> */}
          Attempt
        </button>
      </div>
    </div>
  );
}
