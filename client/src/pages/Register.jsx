import { useState } from 'react';
import { registerUser } from '../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await registerUser({ name, email, password }); 
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md border border-blue-200 flex flex-col gap-6"
      >
        <h1 className="text-3xl font-extrabold mb-2 text-blue-700 text-center">Register</h1>
        {error && <div className="text-red-600 text-center">{error}</div>}

       
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          required
        />

        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          required
        />

        {/* Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          required
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirm Password"
          className="border border-purple-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg shadow-lg transition hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
