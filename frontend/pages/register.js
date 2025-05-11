import { useState } from 'react';
import Head from 'next/head';

export default function Register() {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !photo) {
      setMessage('Please provide both name and photo.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', photo);

    try {
      const response = await fetch('http://localhost:8000/api/students/register.php', {
        method: 'POST',
        body: JSON.stringify({ name, photo_path: `uploads/${photo.name}` }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (data.success) {
        setMessage('Student registered successfully!');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('Failed to register student.');
    }
  };

  return (
    <div className="min-h-screen bg-[#DDFEF8] flex items-center justify-center font-sans">
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      </Head>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-[#23194F] mb-6 text-center">Register Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#23194F]"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#23194F]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#23194F] text-white font-semibold py-2 rounded hover:bg-opacity-80 transition"
          >
            Register
          </button>
        </form>
        {message && <p className="text-red-500 text-sm mt-4 text-center">{message}</p>}
      </div>
    </div>
  );
}
