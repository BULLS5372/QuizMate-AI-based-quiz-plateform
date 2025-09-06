import { useState } from 'react';
import API from '../api/axiosInstance';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.user);
      navigate('/');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-md w-full border border-blue-200">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-blue-700 drop-shadow">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transform transition"
          >
            Login
          </button>
        </form>

        {/* Additional Links */}
        <div className="text-center mt-6 text-gray-600">
          <p>
            Don’t have an account?{' '}
            <a
              href="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
