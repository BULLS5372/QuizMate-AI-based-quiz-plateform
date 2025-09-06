import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import logo from '../assets/MainLogo.png';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 shadow flex items-center px-6 py-3">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="QuizMate Logo" className="h-12 w-auto mr-3" />
      </Link>

      {/* Spacer */}
      <div className="flex-1"></div>

      {/* Navigation Links */}
      <div className="flex gap-6 items-center">
        <Link
          to="/"
          className="text-lg font-semibold text-gray-700 hover:text-blue-700 transition"
        >
          Home
        </Link>
        <Link
          to="/quiz/create"
          className="text-lg font-semibold text-gray-700 hover:text-purple-700 transition"
        >
          Generate Quiz
        </Link>

        {user ? (
          <>
            <span className="text-lg font-semibold text-green-700">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="text-lg font-semibold text-gray-700 hover:text-red-700 transition bg-gray-100 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-lg font-semibold text-gray-700 hover:text-blue-700 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-lg font-semibold text-gray-700 hover:text-blue-700 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
