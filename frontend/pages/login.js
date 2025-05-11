import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/users/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Ensure cookies are sent for session handling
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        const { role } = data.user;
        if (role === 'admin') {
          router.push('/dashboard');
        } else if (role === 'teacher') {
          router.push('/teacher');
        } else if (role === 'student') {
          router.push('/student');
        }
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#DDFEF8] flex items-center justify-center font-sans">
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-[#23194F] mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#23194F]"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#23194F]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#23194F] text-white font-semibold py-2 rounded hover:bg-opacity-80 transition"
          >
            Login
          </button>
        </form>
        {message && <p className="text-red-500 text-sm mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
