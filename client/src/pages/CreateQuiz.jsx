import { useState } from 'react';
import API from '../api/axiosInstance';

export default function CreateQuiz() {
  const [stu_class, setStuClass] = useState('');
  const [topics, setTopics] = useState('');
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stu_class.trim() || !topics.trim()) return alert('Please fill all fields');
    setLoading(true);
    try {
      const known_topics = topics.split(',').map(t => t.trim());
      const res = await API.post('/quiz/create', { stu_class, known_topics });
      alert('Quiz created: ' + res.data.quiz.title);
      setStuClass('');
      setTopics('');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create quiz');
      console.error('Error creating quiz:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full border border-blue-200">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700 drop-shadow">
          Generate Quiz
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Class Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Class/Difficulty level</label>
            <input
              type="text"
              value={stu_class}
              onChange={(e) => setStuClass(e.target.value)}
              placeholder="Enter class"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            />
          </div>

          {/* Topics Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Topics</label>
            <input
              type="text"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="Enter topics (comma separated)"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transform transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>

        </form>
      </div>
    </div>
  );
}
