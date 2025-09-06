import { useEffect, useState } from 'react';
import API from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import QuizCard from '../components/QuizCard';

export default function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' = oldest first
  const navigate = useNavigate();

  // ✅ Replace with actual logged-in user (use context or API)
  const currentUser = localStorage.getItem('username'); // or from auth state

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await API.get('/quiz');
      const sortedQuizzes = res.data.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
      setQuizzes(sortedQuizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleSortChange = (e) => {
    const order = e.target.value;
    setSortOrder(order);

    const sorted = [...quizzes].sort((a, b) => {
      return order === 'asc'
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    });

    setQuizzes(sorted);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await API.delete(`/quiz/${id}`);
        setQuizzes(quizzes.filter(q => (q.id || q._id) !== id));
      } catch (error) {
        console.error('Error deleting quiz:', error);
        alert('Failed to delete quiz');
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mt-10 mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-blue-700 mb-4">
          Unlock your knowledge Instantly Create AI-Powered Quizzes.
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Generate quizzes on any topic, for any grade level
        </p>
      </div>

      {/* Generate Quiz Button */}
      <button
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg shadow-lg font-bold text-lg transition hover:scale-105 mb-6"
        onClick={() => navigate('/quiz/create')}
      >
        Generate Quiz
      </button>

      {/* Sort Dropdown */}
      <div className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 flex justify-end mb-4">
        <select
          value={sortOrder}
          onChange={handleSortChange}
          className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <option value="asc">Sort by: Oldest</option>
          <option value="desc">Sort by: Newest</option>
        </select>
      </div>

      {/* All Quizzes Section */}
      <div className="bg-white shadow-2xl rounded-3xl px-6 py-10 w-full md:w-4/5 lg:w-3/4 xl:w-3/3 border border-blue-200 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-700 drop-shadow-lg">
          All Generated Quizzes
        </h2>

        <div className="w-full mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {quizzes.map(q => (
            <QuizCard
              key={q.id || q._id}
              quiz={q}
              onDelete={handleDelete}
              currentUser={currentUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
